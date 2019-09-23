import { Component, EventEmitter, Output } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { Project, ERM } from '~models';
import { Color } from '~utils';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	name: { title: 'name', translationKey: 'name', width: 240, sortProperty: 'name' },
	owner: { title: 'project lead', translationKey: 'project-lead', width: 184, sortProperty: 'createdBy.firstName' },
	// TODO Backend duedate
	// dueDate: { title: 'due date', translationKey: 'due-date', width: 140, sortProperty: 'dueDate' },
	dueDate: { title: 'due date', translationKey: 'due-date', width: 140, sortable: false },
	status: { title: 'status', translationKey: 'status', width: 100, sortProperty: 'status.step' },
	createdBy: { title: 'created by', translationKey: 'created-by', width: 140, sortProperty: 'creationDate' },
	creationDate: { title: 'created on', translationKey: 'created-on', width: 140, sortProperty: 'creationDate' },
};

@Component({
	selector: 'projects-list-view-app',
	templateUrl: './projects-list-view.component.html',
	styleUrls: [
		'./projects-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	]
})
export class ProjectsListViewComponent extends ListViewComponent<Project> {

	@Output() showItemsPerPage = new EventEmitter<number>();

	columns = [
		'name', 'owner', 'dueDate', 'status', 'createdBy', 'creationDate'
	];
	tableConfig = tableConfig;
	erm = ERM;
	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}

}
