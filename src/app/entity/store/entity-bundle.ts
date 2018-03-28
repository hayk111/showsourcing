import { createSelector } from 'reselect';
import { EntityActions, makeEntityActionTypes } from '~app/entity/store/entity.action.factory';
import { EntityRepresentation } from '~entity/store/entity.model';
import { entityStateToArray } from '~entity/utils';
import { entityReducerFactory } from '~app/entity/Store/entity.reducer.factory';

export function makeEntityBundle(repr: EntityRepresentation) {
	const actionTypes = makeEntityActionTypes(repr);
	const actions = new EntityActions(actionTypes);
	const reducer = entityReducerFactory(actionTypes);

	// selectors
	const selectEntities = (state) => state.entities;
	const selectState = createSelector([selectEntities], entities => entities[repr.entityName]);
	const selectArray = createSelector([selectState], state => entityStateToArray(state));
	const selectById = createSelector([selectState], state => state.byId);
	const selectOne = (id: string) => createSelector([selectState], state => state.byId[id]);

	return {
		[`${repr.entityName}ActionTypes`]: actionTypes,
		[`${repr.entityName}Actions`]: actions,
		[`${repr.entityName}Reducer`]: reducer,
		[`selectState${repr.entityName.capitalize()}`]: selectState,
		[`selectArray${repr.entityName.capitalize()}`]: selectArray,
		[`selectById${repr.entityName.capitalize()}`]: selectById,
		[`selectOne${repr.entityName.capitalize()}`]: selectOne
	};
}
