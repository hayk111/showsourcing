import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
} from '@angular/core';
import { Project } from '~app/features/projects';

@Component({
	selector: 'project-card-app',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
	@Input() projects: Array<Project>;
	@Output() removeProject = new EventEmitter<Project>();

	constructor() {}

	ngOnInit() {}
}
