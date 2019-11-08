import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { productsJson } from '../mock-data';
import { SelectionService } from '~core/list-page';
import { Project } from '~core/models';

@Component({
	selector: 'project-list-app',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {

	@Input() set projects(projects: Array<Project>) {
		this._projects = projects;
	}

	get projects() {
		return this._projects;
	}

	private _projects: Array<Project>;

	constructor() {}

	trackByFn(project: Project) {
		return project.id;
	}
}
