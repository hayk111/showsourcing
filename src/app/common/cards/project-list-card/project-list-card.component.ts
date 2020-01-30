import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '~core/erm/models';

@Component({
	selector: 'project-list-card-app',
	templateUrl: './project-list-card.component.html',
	styleUrls: ['./project-list-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListCardComponent {

	@Input() projects: Project[];
	@Output() openProject = new EventEmitter<Project>();
	@Output() deleteProject = new EventEmitter<Project>();
	@Output() update = new EventEmitter<Project[]>();

	constructor() { }

}
