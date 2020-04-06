import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService, CloseEventType } from '~shared/dialog';
import {
	ProductSelectionDialogComponent,
	ProjectSelectionDialogComponent
} from '~common/dialogs/selection-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Typename } from '~core/erm3/typename.type';
import { Product, Project } from '~core/erm3/models';
import { tap, filter } from 'rxjs/operators';
import { TemplateMngmtDlgComponent } from '~common/dialogs/custom-dialogs';

@Component({
	selector: 'app-dialog-page',
	templateUrl: './dialog-page.component.html',
	styleUrls: ['./dialog-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPageComponent {
	constructor(public dlgSrv: DialogService, private dlgCommonSrv: DialogCommonService) {}

	testSelectProducts: Product[] = [];
	testSelectProjects: Project[] = [];

	selectProducts() {
		const selectedProducts$ = this.dlgCommonSrv.openSelectionDlg(
			'Product',
			this.testSelectProducts
		);
		selectedProducts$
			.pipe(
				filter(({ type }) => CloseEventType.OK === type),
				tap(({ data }) => console.log(data))
			)
			.subscribe(({ data }) => (this.testSelectProducts = data || []));
	}

	selectProjects() {
		const selectedProjects$ = this.dlgCommonSrv.openSelectionDlg(
			'Project',
			this.testSelectProjects
		);
		selectedProjects$
			.pipe(
				filter(({ type }) => CloseEventType.OK === type),
				tap(({ data }) => console.log(data))
			)
			.subscribe(({ data }) => (this.testSelectProjects = data || []));
	}
}
