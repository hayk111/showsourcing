import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog/services';
import { EditableTextComponent } from '~shared/editable-field';
import { AutoUnsub } from '~utils';
import { RfqDialogComponent } from '~common/modals';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;


	@ViewChild(EditableTextComponent) editable: EditableTextComponent;
	@ViewChild('txt') textarea: ElementRef;

	typeEntity = ERM.PRODUCT;

	constructor(
		private route: ActivatedRoute,
		private srv: ProductFeatureService,
		private dlgSrv: DialogService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectOne(params.id)),
			tap(product => this.product = product),
			tap(_ => this.cd.markForCheck())
		);
	}

	updateProduct(product: Product) {
		product.id = this.product.id;
		this.srv.update(product).subscribe();
	}

	updateProductProp(isCancel: boolean, value: any, prop: string) {
		if (!isCancel) {
			// this.updateProduct({ [prop]: value }, prop);
		}
	}

	openRfq() {
		// we add manually the supplier self email, since it is not on the contacts
		this.dlgSrv.open(RfqDialogComponent, { product: this.product });
	}
}
