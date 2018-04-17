import { addEntities, entityStateToArray } from '~app/entity/utils/entity.utils';
import { LatestProductActionType } from './latest-product.action';


export interface State {
	pending: boolean;
	byId: any;
	ids: Array<string>;
}

const initialState = {
	pending: true,
	byId: {},
	ids: []
};

export function reducer(state = initialState, action) {
	switch (action.type) {

		case LatestProductActionType.LOAD:
			return { ...state, pending: true };

		case LatestProductActionType.SET:
			return addEntities(initialState, action.payload);

		default:
			return state;
	}
}

export const selectAll = (state) => entityStateToArray(state);
