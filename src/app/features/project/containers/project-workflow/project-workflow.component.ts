import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ProjectService } from '~global-services';
import { ERMService } from '~global-services/_global/erm.service';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { Project, ERM } from '~models';


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
		private projectSrv: ProjectService,
		private workflowService: ProjectWorkflowFeatureService
	) { }

	ngOnInit() {
		this.project$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.id = id),
			switchMap(id => this.projectSrv.selectOne(id)),
		);

		this.statuses$ = this.project$.pipe(
			switchMap(project => this.workflowService.getStatuses(project))
		);
	}

	onItemSelected(entityId: string) {

	}

}
