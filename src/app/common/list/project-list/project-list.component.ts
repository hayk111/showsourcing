import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '~core/models';

@Component({
	selector: 'project-list-app',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {

	@Input() projects: Array<Project>;

	constructor() {}

	trackByFn(project: Project) {
		return project.id;
	}
}
