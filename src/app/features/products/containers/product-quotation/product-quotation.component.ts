import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModuleRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { CustomField } from '~shared/dynamic-forms';
import { EditableTextComponent } from '~shared/editable-field';
import { AutoUnsub } from '~utils';
import {
  CompareQuotationComponent,
  RfqDialogComponent
} from '~shared/custom-dialog';
import {
  ProductFeatureService,
  QuoteFeatureService
} from '~features/products/services';

@Component({
  selector: 'product-quotation-app',
  templateUrl: './product-quotation.component.html',
  styleUrls: ['./product-quotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductQuotationComponent extends AutoUnsub implements OnInit {
  // whether the form is open
  product$: Observable<Product>;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private srv: ProductFeatureService,
    private dlgSrv: DialogService,
    protected moduleRef: NgModuleRef<any>,
    protected quotationSrv: QuoteFeatureService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.product$ = this.route.parent.params.pipe(
      takeUntil(this._destroy$),
      switchMap(params => this.srv.selectOne(params.id)),
      tap(product => (this.product = product)),
      // need to notify the component things have changed because of onpush and this is container
      // better to do it this way than to not use on push as this will prevent viewChangedAfterItWasCheckedError
      tap(_ => this.cd.markForCheck())
    );
  }

  openRfq() {
    // we add manually the supplier self email, since it is not on the contacts
    this.dlgSrv.openFromModule(RfqDialogComponent, this.moduleRef, {
      product: this.product
    });
  }

  /** Opens a dialog that lets the user compare quotation of this product */
  openCompareQuotationDialog() {
    this.quotationSrv
      .getQuotationFromProduct(this.product.id)
      .subscribe(_quotes => {
        console.log(_quotes);
        this.dlgSrv.openFromModule(CompareQuotationComponent, this.moduleRef, {
          quotes: _quotes
        });
      });
  }
}
