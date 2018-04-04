import { createSelector } from 'reselect';
import { EntityActions, makeEntityActionTypes, EntityActionTypes } from './entity.action.factory';
import { EntityRepresentation } from './entity.model';
import { entityStateToArray } from '~entity/utils';
import { entityReducerFactory } from './entity.reducer.factory';


export interface EntityBundle {
	ActionTypes: EntityActionTypes;
	Actions: EntityActions;
	reducer: any;
	selectState?: any;
	selectArray?: any;
	selectById?: any;
	selectOne?: any;
	selectFocussed?: any;
}

// utility method that generates basic entity Actions, ActionTypes, reducer and selectors.
export function makeEntityBundle(entityName: string) {
	// keeping capitalization so it looks like we are using standard ngrx classes under the hood
	const ActionTypes = makeEntityActionTypes(entityName);
	const Actions = new EntityActions(ActionTypes);
	const reducer = entityReducerFactory(ActionTypes);

	return { ActionTypes, Actions, reducer, ...createEntitySelectors(entityName) };
}
export interface EntitySelectors {
	selectState: any;
	selectArray: any;
	selectById: any;
	selectOne: any;
	selectFocussed: any;
}
export function createEntitySelectors(entityName: string): EntitySelectors {
	// selectors
	const selectEntities = (state) => state.entities;
	const selectState = createSelector([selectEntities], entities => entities[entityName]);
	const selectArray = createSelector([selectState], state => entityStateToArray(state));
	const selectById = createSelector([selectState], state => state.byId);
	const selectOne = (id: string) => createSelector([selectState], state => state.byId[id]);
	const selectFocussed = createSelector([selectState], state => state.byId[state.focussed]);

	return { selectState, selectArray, selectById, selectOne, selectFocussed };
}
