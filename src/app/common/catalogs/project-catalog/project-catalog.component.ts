import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '~core/erm/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'project-catalog-app',
	templateUrl: './project-catalog.component.html',
	styleUrls: ['./project-catalog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCatalogComponent extends TrackingComponent {

	@Input() projects: Project[];
	@Output() openProject = new EventEmitter<Project>();
	@Output() deleteProject = new EventEmitter<Project>();

	constructor() {
		super();
	}

}
