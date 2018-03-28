import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '~app/entity';

@Component({
	selector: 'project-nav-app',
	templateUrl: './project-nav.component.html',
	styleUrls: ['./project-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class ProjectNavComponent implements OnInit {
	@Input() projects: Array<Project>;
	@Input() productCount: { [key: string]: number }; // {id: count}
	@Input() selectedProject: Project;
	@Output() select = new EventEmitter<Project>();

	constructor() { }

	ngOnInit() {
	}

}
