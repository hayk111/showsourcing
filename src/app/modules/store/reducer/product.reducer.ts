import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/product.action';
import { Product } from '../model/product.model';
import { EntityState, entityInitialState, setEntities, copyById } from '../utils/entities.utils';
import { deepCopy } from '../utils/deep-copy.utils';
import { AppComment } from '../model/comment.model';
import { AppFile } from '../model/app-file.model';



export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<any> )
: EntityState<Product> {
	let id;

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

		default: return state;
	}
}

