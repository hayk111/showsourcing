import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product, Project } from '~core/erm3/models';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'app-dialog-page',
	templateUrl: './dialog-page.component.html',
	styleUrls: ['./dialog-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPageComponent {
	constructor(public dlgSrv: DialogService, private dlgCommonSrv: DialogCommonService) {}

	selectedProducts: Product[] = [];
	selectedProjects: Project[] = [];

	selectProducts() {
		const selectedProducts$ = this.dlgCommonSrv.openSelectionDlg('Product', this.selectedProducts);
		selectedProducts$
			.pipe(tap(({ data }) => console.log(data)))
			.subscribe(({ data }) => (this.selectedProducts = data || []));
	}

	selectProjects() {
		const selectedProjects$ = this.dlgCommonSrv.openSelectionDlg('Project', this.selectedProjects);
		selectedProjects$
			.pipe(tap(({ data }) => console.log(data)))
			.subscribe(({ data }) => (this.selectedProjects = data || []));
	}
}
