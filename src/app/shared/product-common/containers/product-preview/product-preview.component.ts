import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModuleRef, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ProductService, ProductStatusTypeService } from '~global-services';
import { ERM, Product, ProductStatusType } from '~models';
import { ProductAddToProjectDlgComponent, RfqDialogComponent } from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { CustomField } from '~shared/dynamic-forms';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub } from '~utils';

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
	}

	ngOnInit() {
		// creating the form descriptor
		this.product$ = this.featureSrv.selectOne(this.product.id);
		this.firstStatus$ = this.prodStatusSrv.queryAll('', { query: 'inWorkflow == true', sortBy: 'step' }).pipe(
			first(),
			map(status => status[0] ? status[0] : null) // we only need the first
		);
	}

	updateProduct(product: any) {
		this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
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

}
