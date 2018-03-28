import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectEntityArray } from '~entity';
import { Entity, EntityRepresentation, ERM } from '~entity';

@Component({
	selector: 'data-management-page-app',
	templateUrl: './data-management-page.component.html',
	styleUrls: ['./data-management-page.component.scss'],
})
export class DataManagementPageComponent implements OnInit {
	entities = [ERM.event, ERM.category, ERM.supplier, ERM.tags, ERM.projects];
	selectedEntity;
	selection = [];
	items$: Observable<Array<Entity>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.select(this.entities[0]);
	}

	resetSelection() {
		this.selection = new Array();
	}

	deleteSelection() {
		this.selection.forEach(s => this.removeItem(s));
		this.resetSelection();
	}

	mergeSelection() {
		// this.store.dispatch();
		this.resetSelection();
	}

	onSelection(itemIds) {
		this.selection = itemIds;
	}

	select(entity: EntityRepresentation) {
		this.selectedEntity = entity;
		this.items$ = this.store.select(selectEntityArray(entity));
	}

	removeItem(id: string) {
		this.store.dispatch(this.selectedEntity.actions.delete([id]));
	}

	updateItem(patch) {
		this.store.dispatch(this.selectedEntity.actions.patch(patch));
	}
}
