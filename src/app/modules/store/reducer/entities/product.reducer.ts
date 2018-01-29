import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/entities/product.action';
import { Product } from '../../model/entities/product.model';
import { EntityState, entityInitialState, setEntities, copyById, addEntities, removeId } from '../../utils/entities.utils';
import { deepCopy } from '../../utils/deep-copy.utils';
import { AppComment } from '../../model/entities/comment.model';
import { AppFile } from '../../model/entities/app-file.model';
import { Tag } from '../../model/entities/tag.model';
import { Project } from '../../model/entities/project.model';



export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<any> )
: EntityState<Product> {
	let id;
	switch (action.type) {

		case ActionType.SET:
			return setEntities(action.payload);

		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		case ActionType.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		case ActionType.DELETE:
			id = action.payload;
			return removeId(state, id);

		default: return state;
	}
}

