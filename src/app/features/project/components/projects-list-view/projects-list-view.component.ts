import { Component } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Project } from '~models';

@Component({
	selector: 'projects-list-view-app',
	templateUrl: './projects-list-view.component.html',
	styleUrls: [
		'./projects-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	]
})
export class ProjectsListViewComponent extends ListViewComponent<Project> {


}
