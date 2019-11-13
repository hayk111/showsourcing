import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'project-list-app',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent extends TrackingComponent {

	@Input() projects: { count: Number, items: Array<Project> };
	@Output() projectClicked = new EventEmitter<Project>();

	constructor() {
		super();
	}

}
