import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '~app/entity';

@Component({
	selector: 'project-nav-app',
	templateUrl: './project-nav.component.html',
	styleUrls: ['./project-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectNavComponent implements OnInit {
	@Input() projects: Array<Project>;
	@Input() productCount: { [key: string]: number }; // {id: count}
	@Input() selectedProject: Project;
	@Output() select = new EventEmitter<Project>();

	constructor() { }

	ngOnInit() {
	}

	isSelected(project) {
		return project.id === this.selectedProject.id;
	}

}
