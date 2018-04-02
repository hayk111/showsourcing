import { createSelector } from 'reselect';
import { EntityActions, makeEntityActionTypes } from './entity.action.factory';
import { EntityRepresentation } from './entity.model';
import { entityStateToArray } from '~entity/utils';
import { entityReducerFactory } from './entity.reducer.factory';

export function makeEntityBundle(entityName: string) {
	// keeping capitalization so it looks like we are using standard ngrx classes under the hood
	const ActionTypes = makeEntityActionTypes(entityName);
	const Actions = new EntityActions(ActionTypes);
	const reducer = entityReducerFactory(ActionTypes);

	// selectors
	// TODO: remove use of reselect and just use normal pipes
	const selectEntities = (state) => state.entities;
	const selectState = createSelector([selectEntities], entities => entities[entityName]);
	const selectArray = createSelector([selectState], state => entityStateToArray(state));
	const selectById = createSelector([selectState], state => state.byId);
	const selectOne = (id: string) => createSelector([selectState], state => state.byId[id]);


	return { ActionTypes, Actions, reducer, selectState, selectArray, selectById, selectOne };
}
