import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
@Component({
	selector: 'project-nav-app',
	templateUrl: './project-nav.component.html',
	styleUrls: ['./project-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectNavComponent extends TrackingComponent implements OnInit {
	@Input() projects: Array<Project>;
	@Input() productCount: { [key: string]: number }; // {id: count}
	@Input() selectedProject: Project;
	@Output() select = new EventEmitter<Project>();

	constructor() {
		super();
	}

	ngOnInit() {
	}

	isSelected(project) {
		return project.id === this.selectedProject.id;
	}

}
