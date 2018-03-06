import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '~entity';

import { FilterEntityPanelService } from '../../services/filter-entity-panel.service';
import {
	FEPActionType as ActionType,
	FilterEntityPanelActions,
} from '../actions/filter-entity-panel.action';

@Injectable()
export class FilterEntityPanelEffects {
	@Effect()
	setRepr$ = this.actions$
		.ofType<any>(ActionType.SET_ENTITY)
		.pipe(
			map(action => action.payload),
			map((repr: EntityRepresentation) => FilterEntityPanelActions.loadChoices(repr))
		);

	@Effect()
	loadChoices$ = this.actions$
		.ofType<any>(ActionType.LOAD_CHOICES)
		.pipe(
			map(action => action.payload),
			switchMap((repr: EntityRepresentation) => this.srv.getItemsWithCount(repr)),
			map(items => FilterEntityPanelActions.setChoices(items))
		);

	constructor(private actions$: Actions, private srv: FilterEntityPanelService) {}
}
