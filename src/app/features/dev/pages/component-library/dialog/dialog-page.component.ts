import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product, Project } from '~core/erm3/models';
import { DialogService } from '~shared/dialog';
import { ApiService } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'app-dialog-page',
	templateUrl: './dialog-page.component.html',
	styleUrls: ['./dialog-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPageComponent {
	constructor(
		public dlgSrv: DialogService,
		private dlgCommonSrv: DialogCommonService,
		private apiSrv: ApiService
	) {}

	selectedProducts: Product[] = [];
	selectedProjects: Project[] = [];

	/*--- Selection Dialogs ---*/

	selectProducts() {
		const selectedProducts$ = this.dlgCommonSrv.openSelectionDlg('Product', this.selectedProducts);
		// TODO implement new dialog
		// selectedProducts$
		// 	.pipe(tap(({ data }) => console.log(data)))
		// 	.subscribe(({ data }) => (this.selectedProducts = data || []));
	}

	selectProjects() {
		const selectedProjects$ = this.dlgCommonSrv.openSelectionDlg('Project', this.selectedProjects);
		// TODO implement new dialog
		// selectedProjects$
		// 	.pipe(tap(({ data }) => console.log(data)))
		// 	.subscribe(({ data }) => (this.selectedProjects = data || []));
	}

	/*--- Creation Dialogs ---*/

	createProduct() {
		this._creationHelper('Product');
	}
	createSample() {
		this._creationHelper('Sample');
	}
	createTask() {
		this._creationHelper('Task');
	}
	createCategory() {
		this._creationHelper('Category');
	}
	createTag() {
		this._creationHelper('Tag');
	}

	private _creationHelper(typename: Typename) {
		this.dlgCommonSrv.openCreationDlg(typename).data$.subscribe(({entity, createAnother}) => {
			this.apiSrv.create(typename, entity).subscribe(_ => createAnother ? '' : this.dlgCommonSrv.close());
		});
	}
}
