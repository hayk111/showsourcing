import { Component, OnInit } from '@angular/core';
import { Entity, EntityRepresentation, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { selectEntityArray } from '../../../../store/selectors/misc/utils.selector';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { CustomFieldsActions } from '../../../../store/action/entities/custom-fields.action';

@Component({
	selector: 'data-management-page-app',
	templateUrl: './data-management-page.component.html',
	styleUrls: ['./data-management-page.component.scss']
})
export class DataManagementPageComponent implements OnInit {
	entities = [
		entityRepresentationMap.events,
		entityRepresentationMap.categories,
		entityRepresentationMap.suppliers,
		entityRepresentationMap.tags,
		entityRepresentationMap.projects
	];
	selectedEntity;
	selection = [];
	items$: Observable<Array<Entity>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.select(this.entities[0]);
	}

	deleteSelection() {
		this.selection.forEach(s => this.removeItem(s));
	}

	mergeSelection() {
		// this.store.dispatch();
	}

	onSelection(itemIds) {
		this.selection = itemIds;
	}

	select(entity: EntityRepresentation) {
		this.selectedEntity = entity;
		this.items$ = this.store.select(selectEntityArray(entity));
	}

	removeItem(id: string) {
		this.store.dispatch(this.selectedEntity.actions.delete(id));
	}

	updateItem(patch) {
		this.store.dispatch(this.selectedEntity.actions.patch(patch));
	}

}
