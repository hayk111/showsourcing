import { entityInitialState, EntityState } from '~entity/store/entity.model';
import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { TypedAction } from '~utils/typed-action.interface';

import { actionTypes } from './product.action';
import { Product } from './product.model';

export const entityReducer = entityReducerFactory(actionTypes);

export interface State extends EntityState<Product> {
	fullyLoaded: boolean;
}

const initialState = {
	fullyLoaded: false,
	...entityInitialState
};

export function reducer(state: State, action: TypedAction<any>) {
	switch (action.type) {

		case actionTypes.ADD_TAG: {
			const byId = { ...state.byId };
			const tagId = action.payload.tag.id;
			const productId = action.payload.productId;
			const product = { ...byId[productId] };
			let tagIds = product.tagIds;
			// if it's already been added just return state
			if (tagIds.find(id => id === productId)) return state;
			tagIds = tagIds.concat(tagId);
			product.tagIds = tagIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		}
		case actionTypes.REMOVE_TAG: {
			const byId = { ...state.byId };
			const tagId = action.payload.tag.id;
			const productId = action.payload.productId;
			const product = { ...byId[productId] };
			let tagIds = product.tagIds;
			tagIds = tagIds.filter(id => id !== tagId);
			product.tagIds = tagIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		}
		case actionTypes.ADD_PROJECT: {
			const byId = { ...state.byId };
			const projectId = action.payload.project.id;
			const productId = action.payload.productId;
			const product = { ...byId[productId] };
			let projectIds = product.projectIds;
			// if it's already been added just return state
			if (projectIds.find(id => id === projectId)) return state;
			projectIds = projectIds.concat(projectId);
			product.projectIds = projectIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		}
		case actionTypes.REMOVE_PROJECT: {
			const byId = { ...state.byId };
			const projectId = action.payload.project.id;
			const productId = action.payload.productId;
			const product = { ...byId[productId] };
			const projectIds = product.projectIds.filter(id => id !== projectId);
			product.projectIds = projectIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		}
		default: {
			return entityReducer(state, action);
		}
	}
}
