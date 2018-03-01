import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FilterGroupName, selectFilteredEntity } from '~shared/filters';
import { entityRepresentationMap } from '~entity';

import { Project } from '../../models';
import { selectProjects } from '../../store/selectors';

@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
	filterGroupName = FilterGroupName.PROJECTS_PAGE;
	pending$: Observable<boolean>;
	projects$: Observable<Array<Project>>;
	repr = entityRepresentationMap.projects;
	selection = new Map<string, boolean>();

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.projects$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectProjects).pipe(map(p => p.pending));
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}
}
