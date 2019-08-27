import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { productsJson } from './mock-data';
import { SelectionService } from '~core/list-page';

@Component({
	selector: 'app-common-lists-lib-page',
	templateUrl: './common-lists-lib-page.component.html',
	styleUrls: ['./common-lists-lib-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonListsLibPageComponent implements OnInit {
	pending = true;
	products = JSON.parse(productsJson);
	productSelectionSrv = new SelectionService();

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit() {
		setTimeout(_ => {
			this.pending = false;
			this.cd.markForCheck();
		}, 1500);
	}
}
