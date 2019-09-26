import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '~core/models';
import { ProjectStatus } from '~core/models/status.model';

@Component({
	selector: 'project-status-badge-app',
	templateUrl: './project-status-badge.component.html',
	styleUrls: ['./project-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectStatusBadgeComponent implements OnInit {

	@Input() project: Project;
	@Output() update = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() { }

	// this is done for projects since we don't have it on the DB
	getProjectStatus() {
		let projectStatus = ProjectStatus.PENDING;
		if (this.project && this.project.done)
			projectStatus = ProjectStatus.DONE;
		else if (this.project && this.project.dueDate && (new Date().getTime() >= Date.parse(this.project.dueDate.toString())))
			projectStatus = ProjectStatus.OVERDUE;
		return projectStatus;
	}

	// this is done for projects since we don't have it on the DB
	getType() {
		let projectStatusColor = 'secondary'; // pending
		if (this.project && this.project.done)
			projectStatusColor = 'success'; // done
		else if (this.project && this.project.dueDate && (new Date().getTime() >= Date.parse(this.project.dueDate.toString())))
			projectStatusColor = 'warn'; // overdue
		return projectStatusColor;
	}

}
