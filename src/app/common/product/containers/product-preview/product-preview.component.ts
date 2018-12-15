import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ProductService } from '~entity-services';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { AppImage, ERM, PreviewActionButton, Product } from '~models';
import { CustomField } from '~shared/dynamic-forms';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub, PendingImage } from '~utils';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit {
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
	@Output() clickOutside = new EventEmitter<null>();
	/** this is the fully loaded product */
	product$: Observable<Product>;
	erm = ERM;

	actions: PreviewActionButton[];
	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor
	// so we only have one array of custom fields
	customFields: CustomField[] = [
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
			name: 'assignee',
			label: 'Assignee',
			type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'textarea', label: 'MOQ description' },
		{
			name: 'tags',
			type: 'selector',
			metadata: {
				target: 'tag',
				type: 'entity',
				labelName: 'name',
				canCreate: true
			},
			multiple: true
		},
		{ name: 'description', type: 'textarea', label: 'description' }
	];

	// those are the custom field for the second form section
	customFields2: CustomField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'samplePrice', type: 'number', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'number', label: 'Sample Price' }
	];

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
		private route: ActivatedRoute,
		private uploader: UploaderService,
		private cd: ChangeDetectorRef,
		private featureSrv: ProductService,
		private modalSrv: CommonModalService,
		private router: Router,
		private workspaceSrv: WorkspaceFeatureService
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
				action: null
			},
			{
				icon: 'export',
				text: 'Share',
				fontSet: '',
				action: null
			}
		];
	}

	ngOnInit() {
		this.product$ = this.featureSrv.selectOne(this.product.id);
		this.product$
			.pipe(takeUntil(this._destroy$))
			.subscribe(s => (this.product = s));
	}

	updateProduct(product: any) {
		product.id = this.product.id;
		this.featureSrv.update(product).subscribe();
	}

	update(value: any, prop: string) {
		this.updateProduct({ [prop]: value });
	}

	clickOnAction(action: PreviewActionButton) {
		if (action.action) {
			action.action();
		}
	}

	openRfq() {
		this.modalSrv.openRequestFeedbackDialog([this.product]);
	}

	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.modalSrv.openAddToProjectDialog([this.product]);
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

	/** Triggers status update */
	onStatusUpdated(product, status) {
		this.workspaceSrv.updateProductStatus(product, status).subscribe();
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
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
