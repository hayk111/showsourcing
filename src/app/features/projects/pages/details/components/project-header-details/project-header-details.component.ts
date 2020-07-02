import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project, ERM, Product } from '~core/erm';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AutoUnsub } from '~utils';
import { TranslateService } from '@ngx-translate/core';
import { ProjectFeatureService } from '~features/projects/services';
import { ProductService } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'project-header-details-app',
	templateUrl: './project-header-details.component.html',
	styleUrls: ['./project-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectHeaderDetailsComponent extends AutoUnsub implements OnInit {

	@Input() project: Project;
	@Output() delete = new EventEmitter<Project>();

	id: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		public listHelper: ListHelper2Service,
	) {
		super();
	}

	ngOnInit() {
	}

	isTabUrl(tab: string): boolean {
		return this.router.url === `/project/${this.route.snapshot.params.id}/${tab}`;
	}

	openFindProductDlg() {
		// this.featureSrv.openFindProductDlg(this.project).pipe(
		// 	switchMap(_ => this.listSrv.refetch())
		// ).subscribe();
	}

}
