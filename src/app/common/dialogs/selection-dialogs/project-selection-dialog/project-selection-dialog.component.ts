import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CloseEventType } from '~shared/dialog';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';
import { SelectionService, ListHelperService, ListPageViewService } from '~core/list-page2';
import { Project, Product } from '~core/erm3/models';
import { FilterType } from '~core/filters';
import { ProjectsTableComponent } from '~common/tables/projects-table/projects-table.component';

@Component({
	selector: 'product-add-to-project-dlg-app',
	templateUrl: './project-selection-dialog.component.html',
	styleUrls: ['./project-selection-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectionService, ListHelperService],
	host: { class: 'table-dialog' }
})
export class ProjectSelectionDialogComponent extends AutoUnsub implements OnInit {
	@Input() initialSelecteds: Project[];

	columns = ProjectsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProjectsTableComponent.DEFAULT_TABLE_CONFIG;

	filterTypes = [FilterType.CREATED_BY];

	constructor(
		private dlgSrv: DialogService,
		public listHelper: ListHelperService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Product>
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Project');
		this.selectionSrv.selectAll(this.initialSelecteds);
	}

	/** close the dialog, send type "OK" and data (entities selecteds) to the observable returned by commonDlg.openSelectionDlg()  */
	done() {
		// this.dlgSrv.close({ type: CloseEventType.OK, data: this.selectionSrv.getSelectedValues() });
			// TODO implement new dialog
	}

	// submit() {
		// this.productDlgSrv
		// 	.addProjectsToProducts(addedProjects, this.products)
		// 	.subscribe(projects => {
		// 		this.initialSelectedProjects = [
		// 			...this.initialSelectedProjects,
		// 			...addedProjects
		// 		];
		// 		this.toastSrv.add({
		// 			type: ToastType.SUCCESS,
		// 			title: 'title.projects-added',
		// 			message: 'message.your-projects-added-success',
		// 			timeout: 3500
		// 		});
		// 	});
	// }
}
