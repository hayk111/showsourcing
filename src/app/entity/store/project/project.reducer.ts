import { entityInitialState } from '~entity/store/entity.model';
import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { TypedAction } from '~utils';

import { projectActionTypes as actionTypes } from './project.actions';

const basicProjectsReducer = entityReducerFactory(actionTypes);
const initialState = { ...entityInitialState, productsCount: {} };

export function projectReducer(state = initialState, action: TypedAction<any>) {
	switch (action.type) {
		case actionTypes.SET_PRODUCT_COUNT:
			return { ...state, productsCount: action.payload };
		default:
			return basicProjectsReducer(state, action);
	}
}
