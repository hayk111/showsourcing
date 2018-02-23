import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../../store/model/entities/project.model';
import { Store } from '@ngrx/store';
import { selectFilteredEntity } from '../../../../store/selectors/misc/filter.selectors';
import { selectProjects } from '../../../../store/selectors/entities/projects.selector';
import { map } from 'rxjs/operators';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';

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
	selections = new Map<string, boolean>();

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.projects$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectProjects).pipe(map(p => p.pending));
	}

	onItemSelected(entityId: string) {
		this.selections.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selections.delete(entityId);
	}
}
