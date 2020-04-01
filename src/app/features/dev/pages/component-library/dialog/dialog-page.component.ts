import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '~shared/dialog';
import {
	ProductSelectionDialogComponent,
	ProjectSelectionDialogComponent,
	TemplateMngmtDlgComponent
} from '~common/dialogs/selection-dialogs';

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
		this.dlgSrv.open(ProductSelectionDialogComponent, {
			initialSelectedProducts: [],
			submitProducts: false
		});
	}
	openAddToProjectDlg() {
		this.dlgSrv.open(ProjectSelectionDialogComponent, { product: [], initialSelectedProjects: [] });
	}
	openTemplateManagementDlg() {
		this.dlgSrv.open(TemplateMngmtDlgComponent);
	}
}
