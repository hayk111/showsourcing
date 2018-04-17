import { addEntities, entityStateToArray, replaceEntities, updateOne } from '~app/entity/utils/entity.utils';

import { ContactActionType } from './contact.actions';


export interface State {
	pending: boolean;
	byId: any;
	ids: Array<string>;
	previewImg: {};
}

const initialState = {
	pending: true,
	byId: {},
	ids: [],
	previewImg: {}
};


export function reducer(state = initialState, action) {
	let id;
	if (action.payload) {
		id = action.payload.id;
	}

	switch (action.type) {

		case ContactActionType.SET_PREVIEW:
		case ContactActionType.CREATE_IMG:
			return { ...state, previewImg: action.payload };

		case ContactActionType.LOAD:
			return { ...state, pending: true };

		case ContactActionType.SET:
			return addEntities(initialState, action.payload);

		case ContactActionType.PATCH:
			const propName = action.payload.propName;
			const value = action.payload.value;
			return updateOne(state, id, propName, value);

		// replace many
		case ContactActionType.REPLACE:
			return replaceEntities(state, action.payload);

		case ContactActionType.CREATE:
			return {
				...state,
				byId: {
					...state.byId,
					[id]: action.payload
				},
				ids: [id, ...state.ids]
			};

		default:
			return state;
	}
}

export const selectAll = (state) => entityStateToArray(state);
export const selectPreview = (state) => state.previewImg;
export const selectOne = (id: string) => (state) => state.byId[id];
