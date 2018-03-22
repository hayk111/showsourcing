import { Project } from '~projects/models/project.model';
import { basicReducerFactory } from '~store';
import { TypedAction } from '~utils';

import { actionTypes } from './project.actions';
import { entityInitialState } from '~app/shared/entity';

const basicProjectsReducer = basicReducerFactory(actionTypes);
const initialState = { ...entityInitialState, productsCount: {} };

export function projectsReducer(state = initialState, action: TypedAction<any>) {
	switch (action.type) {
		case actionTypes.SET_PRODUCT_COUNT:
			return { ...state, productsCount: action.payload };
		default:
			return basicProjectsReducer(state, action);
	}
}
