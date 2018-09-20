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
import { Router } from '@angular/router';

@Component({
	selector: 'project-card-app',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent extends TrackingComponent {
	@Input() projects: Project[];
	@Output() removeProject = new EventEmitter<Project>();
	@Output() addProjectClick = new EventEmitter<null>();

	constructor(private router: Router) {
		super();
	}

	onRemove(project, event: MouseEvent) {
		event.stopPropagation();
		this.removeProject.emit(project);
	}

	goToDetails(project: Project) {
		this.router.navigate(['project', 'details', project.id]);
	}

}
