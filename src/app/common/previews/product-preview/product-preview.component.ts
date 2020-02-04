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
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SampleCatalogComponent } from '~common/catalogs/sample-catalog/sample-catalog.component';
import { TaskCatalogComponent } from '~common/catalogs/task-catalog/task-catalog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductDescriptor } from '~core/descriptors';
import { CommentService } from '~core/erm';
import {
	ExtendedFieldDefinitionService,
} from '~core/erm';
import { ProductService, SampleService, TaskService } from '~core/erm';
import { AppImage, Comment, EntityName, ERM, ExtendedFieldDefinition, Product, Sample, Task } from '~core/erm';
import { CloseEvent, CloseEventType } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { UploaderService } from '~shared/file/services/uploader.service';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { RatingDashboardComponent } from '~shared/rating';
import { AutoUnsub, PendingImage } from '~utils';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit, OnChanges {

	/** This is the product passed as input, but it's not yet fully loaded */
	private _product: Product;
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

	@Input() isPreview = true;
	@Input() dashboardPreview = false;

	@Output() close = new EventEmitter<any>();
	@Output() updated = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<Product>();
	@Output() clickOutside = new EventEmitter<null>();

	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;
	@ViewChild(SampleCatalogComponent, { read: ElementRef, static: false }) sampleCatalog: ElementRef;
	@ViewChild(TaskCatalogComponent, { read: ElementRef, static: false }) taskCatalog: ElementRef;
	@ViewChild(RatingDashboardComponent, { read: ElementRef, static: false }) ratingDashboard: ElementRef;
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef;

	/** this is the fully loaded product */
	product$: Observable<Product>;
	productDescriptor1: ProductDescriptor;
	productDescriptor2: ProductDescriptor;
	formConfig = new DynamicFormConfig({ mode: 'editable-text', alignValue: 'right' });
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	private _pendingImages: PendingImage[] = [];

	constructor(
		public dialogCommonSrv: DialogCommonService,
		private uploader: UploaderService,
		private cd: ChangeDetectorRef,
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private router: Router,
		private commentSrv: CommentService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private previewSrv: PreviewService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService
	) { super(); }

	ngOnInit() {
		this.productDescriptor1 = new ProductDescriptor([
			'name', 'reference', 'supplier', 'supplier-reference', 'price', 'category', 'event', 'minimumOrderQuantity', 'moqDescription',
			'assignee'
		]);
		this.productDescriptor1.modify([
			{ name: 'reference', label: 'item-reference' },
			{ name: 'supplier', metadata: { hasBadge: false } },
			{ name: 'event', label: 'trade-show', metadata: { hasBadge: false } },
		]);

		this.productDescriptor2 = new ProductDescriptor([
			'innerCarton', 'masterCarton', 'priceMatrix', 'sample', 'samplePrice', 'incoTerm',
			'harbour', 'masterCbm', 'quantityPer20ft', 'quantityPer40ft', 'quantityPer40ftHC'
		]);
		this.productDescriptor2.insert({ name: 'sample', type: 'title' }, 'sample');
		this.productDescriptor2.insert({ name: 'shipping', type: 'title' }, 'incoTerm');

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryAll(undefined, {
			query: 'target == "Product"',
			sortBy: 'order',
			descending: false
		});
	}

	ngOnChanges() {
		this.product$ = this.productSrv.selectOne(this.product.id);
		this.product$
			.pipe(takeUntil(this._destroy$))
			.subscribe(product => {
				this.product = product;
			});
	}

	// UPDATE FUNCTIONS
	updateProduct(productConfig: any) {
		const product = ({ ...productConfig, id: this.product.id });
		this.productSrv.update(product)
			.subscribe(_ => this.updated.emit(product));
	}

	update(value: any, prop: string) {
		this.updateProduct({ [prop]: value });
	}

	updateTask(task: Task) {
		this.taskSrv.update(task).subscribe();
	}

	updateSample(sample: Sample) {
		this.sampleSrv.update(sample).subscribe();
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

	delete(product: Product) {
		const text = `Are you sure you want to delete this product ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.productSrv.delete(product.id)),
				tap(prod => {
					this.updated.emit(prod);
					this.close.emit();
				})
			).subscribe();
	}

	archive() {
		const text = `Are you sure you want to archive this product ?`;
		const action = 'archive';
		this.dlgSrv.open(ConfirmDialogComponent, { text, action })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				tap(_ => {
					this.update(true, 'archived');
					this.close.emit();
				}),
			).subscribe();
	}

	// ACTIONS
	redirect(subroute?: string) {
		subroute ?
			this.router.navigate(['products', this.product.id, subroute]) :
			this.router.navigate(['products', this.product.id]);
	}

	openSupplier() {
		this.router.navigate(['suppliers', this.product.supplier.id]);
	}

	openAddToProject() {
		this.dialogCommonSrv.openAddToProjectDialog([this.product]);
	}

	openCreateTask() {
		this.dialogCommonSrv.openCreationTaskDlg(this.product, this.product && this.product.supplier).subscribe();
	}

	openCreateSample() {
		this.dialogCommonSrv.openCreationSampleDialog(this.product, this.product && this.product.supplier).subscribe();
	}

	openExportModal() {
		this.dialogCommonSrv.openExportDialog(EntityName.PRODUCT, [this.product]);
	}

	// TAB SELECTION
	selectFirstTab() {
		this.previewSrv.onSelectedTab(1);
	}

	selectSecondTab(scrollTo?: string) {
		this.previewSrv.onSelectedTab(2);
		switch (scrollTo) {
			case 'sample':
				this.sampleCatalog.nativeElement.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'task':
				this.sampleCatalog.nativeElement.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'rating':
				this.ratingDashboard.nativeElement.scrollIntoView({ behavior: 'smooth' });
				break;
		}
	}

	selectThirdTab() {
		this.previewSrv.onSelectedTab(3);
		this.previewComment.focus();
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
