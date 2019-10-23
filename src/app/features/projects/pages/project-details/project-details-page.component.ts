import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ProjectService } from '~core/entity-services';
import { ERM, Project } from '~core/models';
import { ProjectFeatureService } from '~features/projects/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'project-details-page-app',
	templateUrl: './project-details-page.component.html',
	styleUrls: ['./project-details-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsPageComponent extends AutoUnsub implements OnInit {

	project$: Observable<Project>;
	project: Project;
	id: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		private featureSrv: ProjectFeatureService,
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.params.id;
		this.project$ = this.featureSrv.queryOne(id);

		this.project$.subscribe(proj => this.project = proj);
	}

	isTabUrl(tab: string): boolean {
		return this.router.url === `/project/${this.route.snapshot.params.id}/${tab}`;
	}

}
