import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { ERM, Project, fromProject } from '~entity';
import { AutoUnsub } from '~app/app-root/utils';
import { selectFilterGroup } from '~app/shared/filters/store';
import { productActions } from '~product';


@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent extends AutoUnsub implements OnInit {
	pending$: Observable<boolean>;
	projects$: Observable<Array<Project>>;
	projectState$: Observable<Array<Project>>;
	selectedProject: Project;
	selection = new Map<string, boolean>();

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.projects$ = this.store.select(fromProject.selectArray).pipe(filter(arr => arr.length > 0));
		this.projectState$ = this.store.select(fromProject.selectState);
		this.pending$ = this.store.select(fromProject.selectPending);
		// a project needs to be selectioned at all time. Therefor the first time we receive
		// the projects we need to select the first one.
		// after that, the user will selection projects by clicking those in the menu.
		this.projects$.pipe(take(1), takeUntil(this._destroy$)).subscribe(projects => this.selectProject(projects[0]));
	}

	loadProducts(filters) {
		// this.store.dispatch(productActions.load({ filters: filters, pagination: true, drop: 0 }));
	}

	selectProject(project: Project) {
		this.selectedProject = project;
	}

	unselected(entityId: string) {
	}
}
