import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { CommentService } from '~core/entity-services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ProductService, UserService } from '~entity-services';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { AppImage, Comment, ERM, ExtendedFieldDefinition, PreviewActionButton, Product } from '~models';
import { DynamicField } from '~shared/dynamic-forms';
import { UploaderService } from '~shared/file/services/uploader.service';
import { PreviewCommentComponent } from '~shared/preview';
import { AutoUnsub, PendingImage } from '~utils';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
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

	@Output() close = new EventEmitter<any>();
	@Output() delete = new EventEmitter<null>();
	@Output() updated = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<Product>();
	@Output() clickOutside = new EventEmitter<null>();
	// component to scroll into view
	@ViewChild(PreviewCommentComponent) previewComment: PreviewCommentComponent;

	/** this is the fully loaded product */
	product$: Observable<Product>;
	erm = ERM;

	actions: PreviewActionButton[];

	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor
	// so we only have one array of custom fields
	customFields: DynamicField[] = [
		{
			name: 'supplier',
			type: 'selector',
			metadata: {
				target: 'supplier',
				type: 'entity',
				labelName: 'name',
				canCreate: true
			}
		},
		{
			name: 'category',
			type: 'selector',
			metadata: {
				target: 'category',
				type: 'entity',
				labelName: 'name',
				canCreate: true
			}
		},
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'price', type: 'price' },
		{
			name: 'event', type: 'selector',
			metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'assignee',
			label: 'Assignee',
			type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'textarea', label: 'MOQ description' }
	];

	// those are the custom field for the second form section
	customFields2: DynamicField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'title' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'price', label: 'Sample Price' },
		{ name: 'shipping', type: 'title' },
		{
			name: 'incoTerm', type: 'selector', label: 'incoterm',
			metadata: { target: ERM.INCOTERM.singular, canCreate: false, multiple: false, labelName: 'test' }
		},
		{
			name: 'harbour', type: 'selector', label: 'harbour',
			metadata: { target: ERM.HARBOUR.singular, canCreate: false, multiple: false, labelName: 'test' }
		},
		{ name: 'cbm', type: 'decimal', label: 'cubic meters' },
		{ name: 'pcsPer20ft', type: 'number', label: 'pieces per 20 feet' },
		{ name: 'pcsPer40ft', type: 'number', label: 'pieces per 40 feet' },
	];

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	private _images: AppImage[] = [];
	@Input()
	set images(images: AppImage[]) {
		this._images = images;
	}
	get images() {
		return [...this._images, ...(this._pendingImages as any)];
	}
	private _pendingImages: PendingImage[] = [];
	@ViewChild('inpFile') inpFile: ElementRef;

	constructor(
		private uploader: UploaderService,
		private cd: ChangeDetectorRef,
		private productSrv: ProductService,
		private modalSrv: CommonModalService,
		private router: Router,
		private userSrv: UserService,
		private workspaceSrv: WorkspaceFeatureService,
		private commentSrv: CommentService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
		super();

		this.actions = [
			{
				icon: 'camera',
				fontSet: '',
				text: 'Add Picture',
				action: this.openFileBrowser.bind(this)
			},
			{
				icon: 'project',
				fontSet: '',
				text: 'Add',
				action: this.openAddToProject.bind(this)
			},
			{
				icon: 'comments',
				fontSet: '',
				text: 'Comment',
				action: this.scrollToCommentButton.bind(this)
			},
			{
				icon: 'export',
				text: 'Share',
				fontSet: '',
				action: this.openExportModal.bind(this)
			}
		];
	}

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product.extendedFields"' });
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
}
