import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionType, FilterEntityPanelActions } from '../../action/ui/filter-entity-panel.action';
import { map, switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '../../utils/entities.utils';
import { Store } from '@ngrx/store';
import { FilterEntityPanelService } from '../../services/filter-entity-panel.service';


@Injectable()
export class FilterEntityPanelEffects {

	@Effect()
	setRepr$ = this.actions$.ofType<any>(ActionType.SET_ENTITY).pipe(
		map(action => action.payload),
		map((repr: EntityRepresentation) => FilterEntityPanelActions.loadChoices(repr)),
	);

	@Effect()
	loadChoices$ = this.actions$.ofType<any>(ActionType.LOAD_CHOICES).pipe(
		map(action => action.payload),
		switchMap((repr: EntityRepresentation) => this.srv.getItemsWithCount(repr)),
		map(items => FilterEntityPanelActions.setChoices(items))
	);

	constructor(private actions$: Actions, private srv: FilterEntityPanelService, private store: Store<any>) {}

}