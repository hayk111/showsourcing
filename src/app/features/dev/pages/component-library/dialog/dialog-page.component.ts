import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { ProductSelectDlgComponent, ProductAddToProjectDlgComponent } from '~common/dialogs/selection-dialogs';

@Component({
	selector: 'app-dialog-page',
	templateUrl: './dialog-page.component.html',
	styleUrls: ['./dialog-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPageComponent implements OnInit {
	constructor(public dlgSrv: DialogService) {}

	ngOnInit() {}

	openProductSelectorDlg() {
		this.dlgSrv.open(ProductSelectDlgComponent, { initialSelectedProducts: [], submitProducts: false });
	}
	openAddToProjectDlg() {
		this.dlgSrv.open(ProductAddToProjectDlgComponent, { product: [], initialSelectedProjects: [] });
	}
}
