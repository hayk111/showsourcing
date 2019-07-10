import {
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
import { AutoUnsub, PendingImage, translate } from '~utils';

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
	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;

	/** this is the fully loaded product */
	product$: Observable<Product>;
	erm = ERM;

	actions: PreviewActionButton[];

	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor
	// so we only have one array of custom fields
	// TODO i18n
	customFields: DynamicField[] = [
		{
			name: 'supplier',
			type: 'selector',
			label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: {
				target: ERM.SUPPLIER.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true
			}
		},
		{
			name: 'category',
			type: 'selector',
			label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: {
				target: ERM.CATEGORY.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true
			}
		},
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm') },
		{
			name: 'event', type: 'selector', label: translate(ERM.EVENT.singular, 'erm'),
			metadata: { target: ERM.EVENT.singular, type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: translate('MOQ') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') },
		{
			name: 'assignee',
			label: translate('assigned to'),
			type: 'selector',
			metadata: { target: ERM.USER.singular, type: 'entity' }
		},
		{
			name: 'createdBy',
			type: 'selector',
			label: translate('created by'),
			metadata: { target: ERM.USER.singular, type: 'entity', disabled: true }
		},
		{
			name: 'creationDate',
			type: 'date',
			label: translate('creation date'),
			metadata: { disabled: true }
		},
		{
			name: 'lastUpdatedBy',
			type: 'selector',
			label: translate('last updated by'),
			metadata: { target: ERM.USER.singular, type: 'entity', disabled: true }
		},
		{
			name: 'lastUpdatedDate',
			type: 'date',
			label: translate('last updated date'),
			metadata: { disabled: true }
		}
	];

	// those are the custom field for the second form section
	customFields2: DynamicField[] = [
		{ name: 'innerCarton', type: 'packaging', label: translate('inner carton') },
		{ name: 'masterCarton', type: 'packaging', label: translate('master carton') },
		{ name: 'priceMatrix', type: 'priceMatrix', label: translate('price matrix') },
		{ name: translate(ERM.SAMPLE.singular, 'erm'), type: 'title' },
		{ name: 'sample', type: 'boolean' },
		{ name: 'samplePrice', type: 'price', label: translate('sample price') },
		{ name: 'shipping', type: 'title' },
		{
			name: 'incoTerm', type: 'selector', label: 'INCO Term',
			metadata: { target: ERM.INCO_TERM.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{
			name: 'harbour', type: 'selector', label: 'loading port',
			metadata: { target: ERM.HARBOUR.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
		{ name: 'quantityPer20ft', type: 'number', label: `Quantity per 20'` },
		{ name: 'quantityPer40ft', type: 'number', label: `Quantity per 40'` },
		{ name: 'quantityPer40ftHC', type: 'number', label: `Quantity per 40' HC` },
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
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef;

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
				text: translate('add picture'),
				action: this.openFileBrowser.bind(this)
			},
			{
				icon: 'project',
				fontSet: '',
				text: translate('add'),
				action: this.openAddToProject.bind(this)
			},
			{
				icon: 'comments',
				fontSet: '',
				text: translate(ERM.COMMENT.singular, 'erm'),
				action: this.scrollToCommentButton.bind(this)
			},
			{
				icon: 'export',
				text: translate('share'),
				fontSet: '',
				action: this.openExportModal.bind(this)
			}
		];
	}

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "product.extendedFields"' });
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
