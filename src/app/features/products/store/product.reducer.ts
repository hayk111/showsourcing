import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '~entity';
import { entityInitialState } from '~entity/models/entities.model';
import { actionTypes as projectsActionTypes } from '~projects/store/project.actions';
import { basicReducerFactory } from '~store';
import { TypedAction } from '~utils/typed-action.interface';

import { Product } from '../models/product.model';
import { actionTypes } from './product.action';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic reducer + extended reducer
// ----------------------------------------------------------------------------
export const basicProductReducer = basicReducerFactory(actionTypes);

export function productReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {
		// TODO: hassan we don't use actions from other entities in reducer.
		case projectsActionTypes.ADD_PRODUCTS_SUCCESS:
			var byId = { ...state.byId };
			action.payload.forEach(element => {
				const product: Product = { ...byId[element.productId] };
				if (!product.projectIds.includes(element.projectId)) {
					product.projectIds = [...product.projectIds, element.projectId];
				}
				byId[product.id] = product;
			});
			return { ...state, byId };
		case actionTypes.ADD_TAG:
			var byId = { ...state.byId };
			var tagId = action.payload.tag.id;
			var productId = action.payload.productId;
			var product = { ...byId[productId] };
			var tagIds = product.tagIds;
			// if it's already been added just return state
			if (tagIds.find(id => id === projectId)) return state;
			var tagIds = tagIds.concat(tagId);
			product.tagIds = tagIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		case actionTypes.REMOVE_TAG:
			var byId = { ...state.byId };
			var tagId = action.payload.tag.id;
			var productId = action.payload.productId;
			var product = { ...byId[productId] };
			var tagIds = product.tagIds;
			var tagIds = tagIds.filter(id => id !== tagId);
			product.tagIds = tagIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		case actionTypes.ADD_PROJECT:
			var byId = { ...state.byId };
			var projectId = action.payload.project.id;
			var productId = action.payload.productId;
			var product = { ...byId[productId] };
			var projectIds = product.projectIds;
			// if it's already been added just return state
			if (projectIds.find(id => id === projectId)) return state;
			projectIds = projectIds.concat(projectId);
			product.projectIds = projectIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		case actionTypes.REMOVE_PROJECT:
			var byId = { ...state.byId };
			var projectId = action.payload.project.id;
			var productId = action.payload.productId;
			var product = { ...byId[productId] };
			var projectIds = product.projectIds.filter(id => id !== projectId);
			product.projectIds = projectIds;
			byId[productId] = product;
			return {
				...state,
				byId,
			};
		default:
			return basicProductReducer(state, action);
	}
}
