import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
} from '@angular/core';
import { Project, Product } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
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
	@Output() updated = new EventEmitter<Project[]>();

	constructor(private router: Router) {
		super();
	}

	onRemove(project, event: MouseEvent) {
		event.stopPropagation();
		this.removeProject.emit(project);
	}

	openProject(project: Project) {
		this.router.navigate(['project', 'details', project.id]);
	}

}
