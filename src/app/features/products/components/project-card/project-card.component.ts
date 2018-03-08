import { Component, OnInit, Input } from '@angular/core';
import { Project } from '~app/features/projects';

@Component({
	selector: 'project-card-app',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
	@Input() projects: Array<Project>;

	constructor() {}
	ngOnInit() {}
}
