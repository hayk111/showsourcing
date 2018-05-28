import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { Project } from '~models';


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

	constructor() {
		super();
	}

	ngOnInit() {
		// this.projects$ = this.store.select(fromProject.selectArray).pipe(filter(arr => arr.length > 0));
		// this.projectState$ = this.store.select(fromProject.selectState);
		// this.pending$ = this.store.select(fromProject.selectPending);
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
