import { Component } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { Project } from '~models';


const tableConfig: TableConfig = {
	name: { title: 'name', width: 140, sortProperty: 'name' },
	owner: { title: 'owner', width: 190, sortProperty: 'owner' },
	lastUpdatedDate: { title: 'last updated', width: 190, sortProperty: 'lastUpdatedDate' },
	productCount: { title: 'product count', width: 190, sortProperty: 'productCount' },
	creationDate: { title: 'creation date', width: 190, sortProperty: 'creationDate' },
	description: { title: 'description', width: 190 },
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

	columns = [
		'name', 'owner', 'lastUpdatedDate', 'productCount', 'creationDate', 'description'
	];
	tableConfig = tableConfig;
}
