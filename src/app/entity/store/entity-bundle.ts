import { createSelector } from '@ngrx/store';
import { EntityActions, makeEntityActionTypes, EntityActionTypes } from './entity.action.factory';
import { EntityRepresentation } from './entity.model';
import { entityStateToArray } from '~entity/utils';
import { entityReducerFactory } from './entity.reducer.factory';


export interface EntitySelectors {
	selectState?: any;
	selectArray?: any;
	selectById?: any;
	selectOne?: any;
	selectPending?: any;
	selectFocussed?: any;
	selectProductCount?: any;
}

export interface EntityBundle extends EntitySelectors {
	ActionTypes: EntityActionTypes;
	Actions: EntityActions<EntityActionTypes>;
	reducer: any;
}

// utility method that generates basic entity Actions, ActionTypes, reducer and selectors.
export function makeEntityBundle(entityName: string, baseSelector?: any) {
	// keeping capitalization so it looks like we are using standard ngrx classes under the hood
	const ActionTypes = makeEntityActionTypes(entityName);
	const Actions = new EntityActions(ActionTypes);
	const reducer = entityReducerFactory(ActionTypes);

	return { ActionTypes, Actions, reducer, ...createEntitySelectors(entityName, baseSelector) };
}

export function createEntitySelectors(entityName: string, baseSelector?: any): EntitySelectors {
	// selectors
	baseSelector = baseSelector || ((state) => state.entities);
	const selectState = createSelector([baseSelector], entities => entities[entityName]);
	const selectArray = createSelector([selectState], state => entityStateToArray(state));
	const selectById = createSelector([selectState], state => state.byId);
	const selectOne = (id: string) => createSelector([selectState], state => state.byId[id]);
	const selectPending = createSelector([selectState], state => state.pending);
	const selectFocussed = createSelector([selectState], state => state.byId[state.focussed]);
	const selectProductCount = createSelector([selectState], state => state.productCount);

	return { selectState, selectArray, selectById, selectOne, selectPending, selectFocussed, selectProductCount };
}
