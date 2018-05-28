import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ERM } from '~models';

@Component({
	selector: 'data-management-page-app',
	templateUrl: './data-management-page.component.html',
	styleUrls: ['./data-management-page.component.scss'],
})
export class DataManagementPageComponent implements OnInit {
	entities = [ERM.EVENT, ERM.CATEGORY, ERM.SUPPLIER, ERM.TAG, ERM.PROJECT];
	selectedEntity;
	selection = [];
	items$: Observable<any>;

	constructor() { }

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
		this.resetSelection();
	}

	onSelection(itemIds) {
		this.selection = itemIds;
	}

	select(entity: ERM) {
		this.selectedEntity = entity;
		// this.items$ = this.store.select(selectEntityArray(entity));
		this.resetSelection();
	}

	removeItem(id: string) {
		// this.store.dispatch(this.selectedEntity.actions.delete([id]));
	}

	updateItem(patch) {
		// this.store.dispatch(this.selectedEntity.actions.patch(patch));
	}
}
