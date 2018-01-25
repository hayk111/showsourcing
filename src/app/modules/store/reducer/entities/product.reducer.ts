import { EntityState, entityInitialState, addEntities, copyById, entityAddItemToArray,
	EntityTarget, Entity, removeIdFromEntityProp } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';
import { Product } from '../../model/entities/product.model';
import { ActionType } from '../../action/entities/product.action';




export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<any> )
: EntityState<Product> {
	let id;
	let propName;
	let entityId;

	switch (action.type) {

		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.PATCH:
			id = action.payload.id;
			propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		case ActionType.ADD_COMMENTS:
		case ActionType.ADD_PROJECTS:
		case ActionType.ADD_TAGS:
		case ActionType.ADD_TASKS:
			propName = action.payload.propName;
			const added = action.payload.added.map((x: Entity) => x.id);
			entityId = action.payload.target.entityId;
			return entityAddItemToArray(state, entityId, propName, added);

		case ActionType.REMOVE_PROJECT:
		case ActionType.REMOVE_TAG:
		case ActionType.REMOVE_TASK:
		case ActionType.REMOVE_COMMENT:
			propName = action.payload.propName;
			const removed = action.payload.added.map((x: Entity) => x.id);
			entityId = action.payload.target.entityId;
			return removeIdFromEntityProp(state, entityId, propName, removed);

		default: return state;
	}
}

