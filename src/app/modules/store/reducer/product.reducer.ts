import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/product.action';
import { Product } from '../model/product.model';
import { EntityState, entityInitialState, setEntities } from '../utils/entities.utils';



export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<any> )
: EntityState<Product> {
	let id;
	let  newState;
	let target;

	switch (action.type) {

		case ActionType.SET_DATA:
			return setEntities(action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		case ActionType.PATCH_PROPERTY:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		case ActionType.DEEPLY_LOADED:
			id = action.payload.id;
			return copyById(state, id, { ...action.payload.props, deeplyLoaded: true });

		case ActionType.ADD_IMAGES:
			id = action.payload.id;
			newState = copyById(state, id);
			newState.byId[id].images = (state.byId[id].images || []).concat(action.payload.imgs);
			return newState;

		case ActionType.SET_IMG_READY:
			id = action.payload.id;
			const imgID = action.payload.imgID;
			newState = copyById(state, id);
			target = newState.byId[id].images.find(img => img.id === imgID);
			target = { ...target, pending: false };
			return newState;
		default: return state;
	}
}

export function copyById(state, id, additionalProps?: any) {
	return {
		...state,
		byId: {
			...state.byId,
			[id]: {
				...state.byId[id],
				...additionalProps
			}
		}
	};
}
