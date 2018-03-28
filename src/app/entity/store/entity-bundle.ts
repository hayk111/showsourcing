import { createSelector } from 'reselect';
import { EntityActions, makeEntityActionTypes } from '~app/entity/store/entity.action.factory';
import { EntityRepresentation } from '~entity/store/entity.model';
import { entityStateToArray } from '~entity/utils';
import { entityReducerFactory } from '~app/entity/Store/entity.reducer.factory';

// TODO: in order for this to work we need to remove the use of repr

// export function makeEntityBundle(entityName: string) {
// 	const actionTypes = makeEntityActionTypes(repr);
// 	const actions = new EntityActions(actionTypes);
// 	const reducer = entityReducerFactory(actionTypes);

// 	// selectors
// 	const selectEntities = (state) => state.entities;
// 	const selectState = createSelector([selectEntities], entities => entities[entityName]);
// 	const selectArray = createSelector([selectState], state => entityStateToArray(state));
// 	const selectById = createSelector([selectState], state => state.byId);
// 	const selectOne = (id: string) => createSelector([selectState], state => state.byId[id]);


// 	return { actionTypes, actions, reducer, selectState, selectArray, selectById, selectOne };
// }
