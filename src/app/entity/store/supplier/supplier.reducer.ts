import { supplierActionTypes } from './supplier.action';
import { entityReducerFactory } from '../entity.reducer.factory';
import { entityInitialState } from '../entity.model';
import { TypedAction } from '~app/app-root/utils';

const basicReducer = entityReducerFactory(supplierActionTypes);

export function supplierReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {

		case supplierActionTypes.ADD_TAG: {
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
		case supplierActionTypes.REMOVE_TAG: {
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

		default:
			return basicReducer(state, action);
	}
}
