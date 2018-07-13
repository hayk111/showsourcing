import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';

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
