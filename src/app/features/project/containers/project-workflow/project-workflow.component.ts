import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ProjectService } from '~global-services';
import { Project } from '~models/project.model';


@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
})
export class ProjectWorkflowComponent implements OnInit {
	project$: Observable<Project>;
	statuses$: Observable<any>;
	id: string;

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService
	) { }

	ngOnInit() {
		this.project$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.id = id),
			switchMap(id => this.projectSrv.selectOne(id)),
		);

		this.statuses$ = of([
			{
				name: 'Send FQ',
				products: [
					{ name: 'prod1', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] },
					{ name: 'prod1a', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] },
					{ name: 'prod1b', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] }
				]
			},
			{
				name: 'Validate Sample',
				products: [
					{ name: 'prod2', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] },
					{ name: 'prod2b', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] }
				]
			}
		]);
	}

	onItemSelected(entityId: string) {

	}

}
