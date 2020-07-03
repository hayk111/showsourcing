import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { productsJson, suppliersJSON } from './mock-data';
import { SelectionService } from '~core/list-page2';
@Component({
	selector: 'common-list-page-app',
	templateUrl: './common-list-page.component.html',
	styleUrls: ['./common-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonListPageComponent implements OnInit {
	pending = true;
	products = JSON.parse(productsJson);
	productSelectionSrv = new SelectionService();
	suppliers = JSON.parse(suppliersJSON);
	supplierSelectionSrv = new SelectionService();

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit() {
		setTimeout(_ => {
			this.pending = false;
			this.cd.markForCheck();
		}, 1500);
	}
}
