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
import { first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SampleCatalogComponent } from '~common/catalogs/sample-catalog/sample-catalog.component';
import { TaskCatalogComponent } from '~common/catalogs/task-catalog/task-catalog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductDescriptor } from '~core/descriptors';
import { CommentService } from '~core/erm';
import { ExtendedFieldDefinitionService } from '~core/erm';
import { ProductService, SampleService, TaskService } from '~core/erm';
import {
	AppImage,
	Comment,
	EntityName,
	ERM,
	ExtendedFieldDefinition,
	Sample,
	Task,
} from '~core/erm';
import { CloseEvent, CloseEventType } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { Product } from '~core/erm3/models';
import { DialogService } from '~shared/dialog/services';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { UploaderService } from '~shared/file/services/uploader.service';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { RatingDashboardComponent } from '~shared/rating';
import { AutoUnsub, PendingImage } from '~utils';
import { ApiService } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { ListHelperService } from '~core/list-page2';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit {
	/** This is the product passed as input, but it's not yet fully loaded */
	private _product: Product;
	@Input()
	set product(value: Product) {
		// this._product = value;
		// if (value) {
		// 	this.images = this._product.images;
		// }
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

	@Output() close = new EventEmitter<any>();
	@Output() updated = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<Product>();
	@Output() clickOutside = new EventEmitter<null>();

	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;
	@ViewChild(SampleCatalogComponent, { read: ElementRef, static: false }) sampleCatalog: ElementRef;
	@ViewChild(TaskCatalogComponent, { read: ElementRef, static: false }) taskCatalog: ElementRef;
	@ViewChild(RatingDashboardComponent, { read: ElementRef, static: false })
	ratingDashboard: ElementRef;
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef;

	/** this is the fully loaded product */
	productDescriptor1: ProductDescriptor;
	productDescriptor2: ProductDescriptor;
	formConfig = new DynamicFormConfig({ mode: 'editable-text', alignValue: 'right' });
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	private _pendingImages: PendingImage[] = [];

	constructor(
		private listHelper: ListHelperService,
		public dlgCommonSrv: DialogCommonService,
		private uploader: UploaderService,
		private cd: ChangeDetectorRef,
		private dlgSrv: DialogService,
		private router: Router,
		private commentSrv: CommentService,
		private previewSrv: PreviewService,
	) { super(); }

	ngOnInit() {
		this.productDescriptor1 = new ProductDescriptor([
			'name',
			'reference',
			'supplier',
			'supplier-reference',
			'price',
			'category',
			'event',
			'minimumOrderQuantity',
			'moqDescription',
			'assignee',
		]);
		this.productDescriptor1.modify([
			{ name: 'reference', label: 'item-reference' },
			{ name: 'supplier', metadata: { hasBadge: false } },
			{ name: 'event', label: 'trade-show', metadata: { hasBadge: false } },
		]);

		this.productDescriptor2 = new ProductDescriptor([
			'innerCarton',
			'masterCarton',
			'priceMatrix',
			'sample',
			'samplePrice',
			'incoTerm',
			'harbour',
			'masterCbm',
			'quantityPer20ft',
			'quantityPer40ft',
			'quantityPer40ftHC',
		]);
		// this.productDescriptor2.insert({ name: 'sample', type: 'title' }, 'sample');
		// this.productDescriptor2.insert({ name: 'shipping', type: 'title' }, 'incoTerm');

		// this.fieldDefinitions$ = this.extendedFieldDefSrv.queryAll(undefined, {
		// 	query: 'target == "Product"',
		// 	sortBy: 'order',
		// 	descending: false
		// });
	}

	// UPDATE FUNCTIONS
	updateProduct(productConfig: any) {
		const product = ({ ...productConfig, id: this._product.id });
		this.listHelper.update(product, {_version: this._product._version});
		this._product = product;
	}

	update(value: any, prop: string) {
		this.updateProduct({ [prop]: value });
	}

	updateTask(task: Task) {
		// this.taskSrv.update(task).subscribe();
	}

	updateSample(sample: Sample) {
		// this.sampleSrv.update(sample).subscribe();
	}

	addComment(comment: Comment) {
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: { id: this.userSrv.userSync.id } };
		const commentUser = { ...comment };
		const comments = [...(this._product.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			tap(_ => this.listHelper.update({ id: this._product.id, comments }))
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
				(imgs) => {
					// removing pending image
					this._pendingImages = this._pendingImages.filter((p) => !uuids.includes(p.id));
				},
				(e) => (this._pendingImages = [])
			);
	}

	/** adds pending image to the list */
	private async _addPendingImg(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map((file) => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map((p) => p.createData()));
		this._pendingImages.push(...pendingImgs);
		// putting the index at the end so we instantly have feedback the image is being processed
		return pendingImgs.map((p) => p.id);
	}

	delete(product: Product) {
		const text = `Are you sure you want to delete this product ?`;
		this.dlgCommonSrv.openConfirmDlg({ text }).data$
			.pipe(
				tap(_ => this.listHelper.delete(product)),
				tap(prod => {
					this.close.emit();
				})
			).subscribe();
	}

	archive() {
		const text = `Are you sure you want to archive this product ?`;
		const action = 'archive';
		this.dlgCommonSrv.openConfirmDlg({ text, action }).data$.subscribe((_) => {
			this.update(true, 'archived');
			this.close.emit();
		});
	}

	// ACTIONS
	redirect(subroute?: string) {
		subroute
			? this.router.navigate(['products', this.product.id, subroute])
			: this.router.navigate(['products', this.product.id]);
	}

	openSupplier() {
		this.router.navigate(['suppliers', this.product.supplier.id]);
	}

	openAddToProject() {
		// this.dlgCommonSrv.openAddToProjectDialog([this.product]);
	}

	openCreateTask() {
		this.dlgCommonSrv
			.openCreationDlg('Task', {
				product: this.product,
				supplier: this.product && this.product.supplier,
			})
			.data$.subscribe();
			// TODO create Task
	}

	openCreateSample() {
		this.dlgCommonSrv
			.openCreationDlg('Sample', {
				product: this.product,
				supplier: this.product && this.product.supplier,
			})
			.data$.subscribe();
			// TODO create Sample
	}

	openExportModal() {
		this.dlgCommonSrv.openExportDlg(EntityName.PRODUCT, [this.product]);
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
