import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProjectsTableComponent } from '~common/tables/projects-table/projects-table.component';
import { Product, Project } from '~core/erm3/models';
import { FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-add-to-project-dlg-app',
	templateUrl: './project-selection-dialog.component.html',
	styleUrls: ['./project-selection-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectionService, ListHelper2Service],
	host: { class: 'table-dialog' }
})
export class ProjectSelectionDialogComponent extends AutoUnsub implements OnInit {
	@Input() initialSelecteds: Project[];

	columns = ProjectsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProjectsTableComponent.DEFAULT_TABLE_CONFIG;

	filterTypes = [FilterType.CREATED_BY];

	constructor(
		private dlgSrv: DialogService,
		public listHelper: ListHelper2Service,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Product>
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Project', this._destroy$);
		this.selectionSrv.selectAll(this.initialSelecteds);
	}

	/** send selected projects to the observable returned by commonDlg.openSelectionDlg().data$ and close the dialog  */
	done() {
		this.dlgSrv.data(this.selectionSrv.getSelectedValues());
		this.dlgSrv.close();
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
