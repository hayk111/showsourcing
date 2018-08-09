import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
} from '@angular/core';
import { Project } from '~models';

@Component({
	selector: 'project-card-app',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
	@Input() projects: Project[];
	@Output() removeProject = new EventEmitter<Project>();
	@Output() addProjectClick = new EventEmitter<null>();

	constructor() { }
	ngOnInit() { console.log(this.projects); }
}
