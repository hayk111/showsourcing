import { supplierActionTypes } from './supplier.action';
import { entityReducerFactory } from '../entity.reducer.factory';
import { entityInitialState } from '../entity.model';
import { TypedAction } from '~app/app-root/utils';

const basicReducer = entityReducerFactory(supplierActionTypes);

export function supplierReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {

		case supplierActionTypes.ADD_TAG:
			return addTag(state, action);
		case supplierActionTypes.REMOVE_TAG:
			return removeTag(state, action);
		case supplierActionTypes.ADD_CATEGORY:
			return addCategory(state, action);
		case supplierActionTypes.REMOVE_CATEGORY:
			return removeCategory(state, action);

		default:
			return basicReducer(state, action);
	}
}

function addTag(state, action) {
	const byId = { ...state.byId };
	const tagId = action.payload.tag.id;
	const supplierId = action.payload.supplierId;
	const supplier = { ...byId[supplierId] };
	let tagIds = supplier.tagIds || [];
	// if it's already been added just return state
	if (tagIds.find(id => id === tagId))
		return state;
	tagIds = tagIds.concat(tagId);
	supplier.tagIds = tagIds;
	byId[supplierId] = supplier;
	return {
		...state,
		byId,
	};
}

function removeTag(state, action) {
	const byId = { ...state.byId };
	const tagId = action.payload.tag.id;
	const supplierId = action.payload.supplierId;
	const supplier = { ...byId[supplierId] };
	let tagIds = supplier.tagIds;
	tagIds = tagIds.filter(id => id !== tagId);
	supplier.tagIds = tagIds;
	byId[supplierId] = supplier;
	return {
		...state,
		byId,
	};
}

function addCategory(state, action) {
	const byId = { ...state.byId };
	const categoryId = action.payload.category.id;
	const supplierId = action.payload.supplierId;
	const supplier = { ...byId[supplierId] };
	let categoryIds = supplier.categoryIds || [];
	// if it's already been added just return state
	if (categoryIds.find(id => id === categoryId))
		return state;
	categoryIds = categoryIds.concat(categoryId);
	supplier.categoryIds = categoryIds;
	byId[supplierId] = supplier;
	return {
		...state,
		byId,
	};
}

function removeCategory(state, action) {
	const byId = { ...state.byId };
	const categoryId = action.payload.category.id;
	const supplierId = action.payload.supplierId;
	const supplier = { ...byId[supplierId] };
	let categoryIds = supplier.categoryIds;
	categoryIds = categoryIds.filter(id => id !== categoryId);
	supplier.categoryIds = categoryIds;
	byId[supplierId] = supplier;
	return {
		...state,
		byId,
	};
}

