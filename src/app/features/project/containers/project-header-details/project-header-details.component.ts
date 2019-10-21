import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ERM } from '~core/models';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services';
import { AutoUnsub } from '~utils';
import { map, tap, switchMap, take, filter } from 'rxjs/operators';
import { ProjectService } from '~core/entity-services';

@Component({
  selector: 'app-project-header-details',
  templateUrl: './project-header-details.component.html',
  styleUrls: ['./project-header-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectHeaderDetailsComponent extends AutoUnsub implements OnInit {

  project$: Observable<Project>;
	project: Project;
	id: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		private featureSrv: ProjectFeatureService,
		private projectSrv: ProjectService,
		private translate: TranslateService,
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
