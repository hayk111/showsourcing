import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'showsourcing-api-lib';
import { Observable } from 'rxjs';
import { ERM, Project } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { AutoUnsub } from '~utils';

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
		private listHelper: ListHelper2Service,
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Project', this._destroy$);

		const id = this.route.snapshot.params.id;
		this.project$ = api.Project.get$(id).data$ as any;
	}

	isTabUrl(tab: string): boolean {
		return this.router.url === `/project/${this.route.snapshot.params.id}/${tab}`;
	}

	removeProject(project: Project) {
		this.listHelper.delete(project);
		this.router.navigate(['projects']);
	}
}
