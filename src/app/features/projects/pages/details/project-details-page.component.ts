import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ProjectService } from '~core/erm';
import { ERM, Project } from '~core/erm';
import { ProjectFeatureService } from '~features/projects/services';
import { AutoUnsub } from '~utils';
import { api } from 'lib';
import { ListHelperService } from '~core/list-page2';

@Component({
	selector: 'project-details-page-app',
	templateUrl: './project-details-page.component.html',
	styleUrls: ['./project-details-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsPageComponent extends AutoUnsub implements OnInit {

	project$: Observable<Project>;
	id: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		private featureSrv: ProjectFeatureService,
		private listHelper: ListHelperService,
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Project');

		const id = this.route.snapshot.params.id;
		this.project$ = api.Project.get(id) as any;
	}

	isTabUrl(tab: string): boolean {
		return this.router.url === `/project/${this.route.snapshot.params.id}/${tab}`;
	}

	removeProject(project: Project) {
		this.listHelper.delete(project);
		this.router.navigate(['projects']);
	}
}
