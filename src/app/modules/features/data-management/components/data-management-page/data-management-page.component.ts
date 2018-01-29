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
	selectedEntity$ = new BehaviorSubject(this.entities[0]);
	selection = [];
	items$: Observable<Array<Entity>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.items$ = this.selectedEntity$.pipe(
			switchMap(entity => this.store.select(selectEntityArray(entity))),
		);
	}

	deleteSelection() {
		this.selection.forEach(s => this.removeItem(s));
	}

	mergeSeleciton() {
		this.store.dispatch();
	}

	onSelection(itemIds) {
		this.selection = itemIds;
	}

	select(entity: EntityRepresentation) {
		this.selectedEntity$.next(entity);
	}

	removeItem(id: string) {
		this.selectedEntity$.pipe(
			take(1)
		).subscribe(entityRepr => {
			const target = {
				entityId: id,
				entityRepr
			};
			this.store.dispatch(CustomFieldsActions.delete(target));
		});
	}

	updateItem(patch) {
		this.selectedEntity$.pipe(
			take(1)
		).subscribe(entityRepr => {
			const target = {
				entityId: patch.itemId,
				entityRepr
			};
			this.store.dispatch(CustomFieldsActions.patch(target, patch.propName, patch.value));
		});

	}

}
