import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Contact, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'compare-quotation-app',
	templateUrl: './compare-quotation.component.html',
	styleUrls: ['./compare-quotation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareQuotationComponent extends AutoUnsub implements AfterViewInit, OnInit {

  @Input() products: Product[] = [];

	constructor(
		private dlgSrv: DialogService) {
      super();
    }

	ngOnInit() {
	}

  ngAfterViewInit() {

  }

	closeDlg() {
		this.dlgSrv.close();
	}
}
