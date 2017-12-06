import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/product.action';
import { Product } from '../model/product.model';
import { EntityState, entityInitialState, setEntities, copyById } from '../utils/entities.utils';
import { deepCopy } from '../utils/deep-copy.utils';
import { AppComment } from '../model/comment.model';



export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<any> )
: EntityState<Product> {
	let id;
	let newState;
	let votes;
	let target;
	let targetIndex;

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

		case ActionType.ADD_PENDING_IMAGE:
			id = action.payload.id;
			const img = { ...action.payload.img, pending: true };
			newState = copyById(state, id);
			// we can use push because copyById makes a deep copy of the product
			newState.byId[id].images.push(img);
			return newState;

		case ActionType.SET_IMG_READY:
			id = action.payload.id;
			const imgID = action.payload.imgID;
			newState = copyById(state, id);
			const targetImgs = newState.byId[id].images;
			// find img
			targetIndex = targetImgs.findIndex(daimg => daimg.id === imgID);
			targetImgs[targetIndex].pending = false;
			return newState;

		case ActionType.ADD_VOTE_PENDING:
			id = action.payload.productId;
			newState = copyById(state, id);
			votes = newState.byId[id].votes;

			targetIndex = votes.find(v => v.userId === action.payload.userId);
			if (targetIndex !== undefined)
				votes[targetIndex] = action.payload;
			// if vote is already there (we voted before but decide to vote back)
			else
				votes.push(action.payload);
			return newState;

		case ActionType.ADD_VOTE:
			id = action.payload.productId;
			newState = copyById(state, id);
			votes = newState.byId[id].votes;
			targetIndex = votes.findIndex(v => v.userId === action.payload.userId);
			votes[targetIndex] = action.payload.vote;
			return newState;

		case ActionType.ADD_PENDING_COMMENT:
			const comment: AppComment = action.payload;
			id = comment.productId;
			newState = copyById(state, id);
			newState.byId[id].comments.push(comment);
			return newState;

		case ActionType.SET_COMMENT_READY:
			id = action.payload.productId;
			const pendingUuid = action.payload.pendingUuid;
			newState = copyById(state, id);
			const comments = newState.byId[id].comments;
			target = comments.find(c => c.pendingUuid === pendingUuid);
			target.pending = false;
			return newState;

		default: return state;
	}
}

