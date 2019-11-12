import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

	constructor() {
		super();
	}

}
