import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModuleRef, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ProductService, ProductStatusTypeService } from '~entity-services';
import { ERM, Product, ProductStatusType, AppImage, PreviewActionButton } from '~models';
import { ProductAddToProjectDlgComponent, RfqDialogComponent } from '~common/dialog';
import { DialogService } from '~shared/dialog/services';
import { CustomField } from '~shared/dynamic-forms';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub } from '~utils';
import { any } from 'async';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit {
	/** This is the product passed as input, but it's not yet fully loaded */
	@Input() product: Product;
	@Output() close = new EventEmitter<any>();
	@Output() delete = new EventEmitter<null>();
	/** this is the fully loaded product */
	product$: Observable<Product>;
	firstStatus$: Observable<ProductStatusType>;
	prodERM = ERM.PRODUCT;
	selectedIndex = 0;
	erm = ERM;
	modalOpen = false;

	actions: PreviewActionButton[];
	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor
	// so we only have one array of custom fields
	customFields: CustomField[] = [
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'category', type: 'selector', metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'price', type: 'price' },
		{
			name: 'assignee', label: 'Assignee', type: 'selector', metadata:
				{ target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },
		{ name: 'description', type: 'textarea', label: 'description' },
	];

	// those are the custom field for the second form section
	customFields2: CustomField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'samplePrice', type: 'number', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'number', label: 'Sample Price' },
	];
	
	constructor(
		private featureSrv: ProductService,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private router: Router,
		private thumbSrv: ThumbService,
		private prodStatusSrv: ProductStatusTypeService,
		private workspaceSrv: WorkspaceFeatureService) {
		super();

		this.actions = [{
			icon: 'camera',
			fontSet: 'fa',
			text: 'Add Picture',
			action: null,
		}, {
			icon: 'folder-plus',
			fontSet: 'fa',
			text: 'Add',
			action: this.openAddToProject.bind(this),
		}, {
			icon: 'comments',
			fontSet: 'fa',
			text: 'Comment',
			action: null,
		}, {
			icon: 'share-square',
			text: 'Share',
			fontSet: 'fa',
			action: null,
		}];
	}

	ngOnInit() {
		// creating the form descriptor
		this.product$ = this.featureSrv.selectOne(this.product.id);
		this.firstStatus$ = this.prodStatusSrv.queryAll('', { query: 'inWorkflow == true', sortBy: 'step' }).pipe(
			first(),
			map(status => status[0] ? status[0] : null) // we only need the first
		);
	}

	updateProduct(product: any, field?: string) {
		this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
	}

	updateProductProp(value: any, prop: string) {
		this.updateProduct({ [prop]: value }, prop);
	}

	clickOnAction(action : PreviewActionButton) {
		action.action();
	}

	onThumbUp(product) {
		const votes = this.thumbSrv.thumbUp(product);
		product = { ...product, votes };
		this.product = { ...product };
		this.updateProduct({ votes });
	}

	onThumbDown(product) {
		const votes = this.thumbSrv.thumbDown(product);
		product = { ...product, votes };
		this.product = { ...product };
		this.updateProduct({ votes });
	}

	openRfq() {
		this.dlgSrv.openFromModule(RfqDialogComponent, this.module, { product: this.product });
	}

	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
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

	/** when image is deleted */
	onDelete(image: AppImage) {
		// 	const images = this.product.images.filter(img => image.id !== img.id);
		// 	this.productSrv.update({ id: this.product.id, images }).subscribe();
	}

	/** opens the modal carousel */
	openModal(index: number) {
		this.selectedIndex = index;
		this.modalOpen = true;
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}
}
