import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { CreationSampleDlgComponent } from '~common/modals/component/creation-sample-dlg/creation-sample-dlg.component';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ProductDescriptor } from '~core/descriptors';
import { CommentService } from '~core/entity-services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { TableConfig } from '~core/list-page';
import { ProductService, TaskService, SampleService } from '~entity-services';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { AppImage, Comment, ERM, ExtendedFieldDefinition, PreviewActionButton, Product, Task, Sample } from '~models';
import { DialogService } from '~shared/dialog/services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub, PendingImage, translate } from '~utils';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.hide-sections]': 'isPreview'
	}
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit, OnChanges {
	/** This is the product passed as input, but it's not yet fully loaded */
	@Input() _product: Product;
	@Input()
	set product(value: Product) {
		this._product = value;
		if (value) {
			this.images = this._product.images;
		}
	}
	get product() {
		return this._product;
	}

	private _images: AppImage[] = [];
	@Input()
	set images(images: AppImage[]) {
		this._images = images;
	}
	get images() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	@Input() isPreview = false;

	@Output() close = new EventEmitter<any>();
	@Output() delete = new EventEmitter<null>();
	@Output() updated = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<Product>();
	@Output() clickOutside = new EventEmitter<null>();
	// component to scroll into view
	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef;

	/** this is the fully loaded product */
	product$: Observable<Product>;
	tasks$: Observable<Task[]>;
	samples$: Observable<Sample[]>;
	productDescriptor1: ProductDescriptor;
	productDescriptor2: ProductDescriptor;
	erm = ERM;

	actions: PreviewActionButton[];

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	taskTableConfig: TableConfig = {
		done: { title: 'done', translationKey: 'done', width: 50 },
		name: {
			title: 'name', translationKey: 'name', width: 240, sortProperty: 'name',
			doubleLine: { property: 'assignee', extraInfo: 'Assigned to' }
		},
		dueDate: { title: 'due date small', translationKey: 'due-date-small', width: 80, sortProperty: 'dueDate' },
	};

	sampleTableConfig: TableConfig = {
		name: { title: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
		status: { title: 'status', translationKey: 'status', width: 130, sortProperty: 'status.step' },
	};

	private _pendingImages: PendingImage[] = [];

	constructor(
		private uploader: UploaderService,
		private cd: ChangeDetectorRef,
		private productSrv: ProductService,
		private modalSrv: CommonModalService,
		private dlgSrv: DialogService,
		private router: Router,
		private workspaceSrv: WorkspaceFeatureService,
		private commentSrv: CommentService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		public previewSrv: PreviewService,
		private ratingSrv: ThumbService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService
	) {
		super();

		this.actions = [];

	}

	ngOnInit() {
		this.productDescriptor1 = new ProductDescriptor([
			'supplier', 'category', 'name', 'price', 'event', 'minimumOrderQuantity', 'moqDescription',
			'assignee', 'createdBy', 'creationDate', 'lastUpdatedBy', 'lastUpdatedDate'
		]);
		this.productDescriptor1.modify([
			{ name: 'supplier', metadata: { hasBadge: false } },
			{ name: 'event', metadata: { hasBadge: false } },
		]);

		this.productDescriptor2 = new ProductDescriptor([
			'innerCarton', 'masterCarton', 'priceMatrix', 'sample', 'samplePrice', 'incoTerm',
			'harbour', 'masterCbm', 'quantityPer20ft', 'quantityPer40ft', 'quantityPer40ftHC'
		]);
		// TODO i18n
		this.productDescriptor2.insert({ name: 'sample', type: 'title' }, 'sample');
		this.productDescriptor2.insert({ name: 'shipping', type: 'title' }, 'incoTerm');

		this.actions = [
			{
				icon: 'sample',
				fontSet: '',
				text: translate('add sample'),
				action: this.openNewSample.bind(this),
				number: this.product.samplesLinked && this.product.samplesLinked.count
			},
			{
				icon: 'check-circle',
				fontSet: '',
				text: translate('add task'),
				action: this.openNewTask.bind(this),
				number: this.product.tasksLinked && this.product.tasksLinked.count
			},
			{
				icon: 'comments',
				fontSet: '',
				text: translate(ERM.COMMENT.singular, 'erm'),
				action: this.scrollToCommentButton.bind(this),
				number: this.product.comments && this.product.comments.length
			},
			{
				icon: 'export',
				text: translate('export'),
				fontSet: '',
				action: this.openExportModal.bind(this)
			}
		];

		// TODO Backend add field
		// this.taskSrv.queryMany({ query: `product.id == "${this.product.id}" AND delete == false AND archived == false  ` });
		this.tasks$ = this.taskSrv.queryMany({ query: `product.id == "${this.product.id}" AND deleted == false` });

		// TODO Backend add field
		// this.taskSrv.queryMany({ query: `product.id == "${this.product.id}" AND delete == false AND archived == false  ` });
		this.samples$ = this.sampleSrv.queryMany({ query: `product.id == "${this.product.id}" AND deleted == false` });

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product"', sortBy: 'order' });
	}

	ngOnChanges() {
		this.product$ = this.productSrv.selectOne(this.product.id);
		this.product$
			.pipe(takeUntil(this._destroy$))
			.subscribe(product => this.product = product);
	}

	updateProduct(productConfig: any) {
		const product = ({ ...productConfig, id: this.product.id });
		this.productSrv.update(product)
			.subscribe(_ => this.updated.emit(product));
	}

	update(value: any, prop: string) {
		this.updateProduct({ [prop]: value });
	}

	clickOnAction(action: PreviewActionButton) {
		if (action.action) {
			action.action();
		}
	}

	openProduct() {
		this.router.navigate(['product', this.product.id]);
	}

	openSupplier() {
		this.router.navigate(['supplier', this.product.supplier.id]);
	}

	openAddToProject() {
		this.modalSrv.openAddToProjectDialog([this.product]);
	}

	openNewTask() {
		this.modalSrv.openCreationTaskDlg();
	}

	openNewSample() {
		this.dlgSrv.open(CreationSampleDlgComponent, {}).subscribe();
	}

	openExportModal() {
		this.modalSrv.openExportDialog([this.product]);
	}

	scrollToCommentButton() {
		this.previewComment.focus();
	}

	/** Add a product to workflow */
	onSentToWorkflow(product: Product) {
		this.workspaceSrv.sendProductToWorkflow(product).subscribe();
	}

	/** Triggers archive product */
	onArchive(product: Product) {
		const { id } = product;
		this.workspaceSrv.update({ id, archived: true }).subscribe();
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

	addComment(comment: Comment) {
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: { id: this.userSrv.userSync.id } };
		const commentUser = { ...comment };
		const comments = [...(this._product.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.productSrv.update({ id: this._product.id, comments }))
		).subscribe();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async add(files: Array<File>) {
		if (files.length === 0) return;

		const uuids: string[] = await this._addPendingImg(files);
		this.cd.markForCheck();
		this.uploader
			.uploadImages(files, this.product)
			.pipe(first())
			.subscribe(
				imgs => {
					// removing pending image
					this._pendingImages = this._pendingImages.filter(
						p => !uuids.includes(p.id)
					);
				},
				e => (this._pendingImages = [])
			);
	}

	/** adds pending image to the list */
	private async _addPendingImg(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map(file => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map(p => p.createData()));
		this._pendingImages.push(...pendingImgs);
		// putting the index at the end so we instantly have feedback the image is being processed
		return pendingImgs.map(p => p.id);
	}

	onStarVote(number: number) {
		this.update(this.ratingSrv.starVote(this.product.votes, number), 'votes');
	}

	updateTask(task: Task) {
		this.taskSrv.update(task).subscribe();
	}

	updateSample(sample: Sample) {
		this.sampleSrv.update(sample).subscribe();
	}

}
