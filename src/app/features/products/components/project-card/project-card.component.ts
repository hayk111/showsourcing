import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
} from '@angular/core';
import { Project } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'project-card-app',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent extends TrackingComponent implements OnInit {
	@Input() projects: Project[];
	@Output() removeProject = new EventEmitter<Project>();
	@Output() addProjectClick = new EventEmitter<null>();

	constructor() {
    super();
  }
	ngOnInit() { }
}
