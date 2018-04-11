import { EntityActions, EntityActionTypes, makeEntityActionTypes } from '~app/entity/store/entity.action.factory';
import { AppImage } from '~app/entity/store/image';
import { createEntitySelectors, EntityBundle } from '~entity/store/entity-bundle';
import { entityReducerFactory } from '~app/entity/store/entity.reducer.factory';
import { entityInitialState, EntityState } from '~app/entity/store/entity.model';
import { Contact } from '~app/features/supplier/store/contacts/contact.model';

const entityName = 'contact';

// state
export interface ContactState extends EntityState<Contact> {
	previewImg: any;
}

const contactInitialState = {
	...entityInitialState,
	previewImg: {}
};

// action types
interface ContactActionTypes extends EntityActionTypes {
	CREATE_IMG: string;
	LINK_IMG: string;
	SET_PREVIEW: string;
}

const contactActionTypes: ContactActionTypes = {
	...makeEntityActionTypes(entityName),
	CREATE_IMG: '[Contact] Creating img',
	LINK_IMG: '[Contact] Linking img',
	SET_PREVIEW: '[Contact] setting preview',
};


// actions
class ContactActions extends EntityActions<ContactActionTypes> {
	createImg(img: AppImage) {
		return {
			type: this.actionType.CREATE_IMG,
			payload: img
		};
	}

	linkImg(img, contactId: string) {
		return {
			type: this.actionType.LINK_IMG,
			payload: { img, contactId }
		};
	}

	setPreview(img) {
		return {
			type: this.actionType.SET_PREVIEW,
			payload: img
		};
	}
}

// reducer

const entityReducer = entityReducerFactory(contactActionTypes, contactInitialState);

function contactReducer(state: ContactState = contactInitialState, action) {
	switch (action.type) {
		case contactActionTypes.SET_PREVIEW:
		case contactActionTypes.CREATE_IMG:
			return { ...state, previewImg: action.payload };
		default:
			return entityReducer(state, action);
	}
}



// bundle
interface ContactBundle extends EntityBundle {
	ActionTypes: ContactActionTypes;
	Actions: ContactActions;
}

export const fromSupplierContact: ContactBundle = {
	ActionTypes: contactActionTypes,
	Actions: new ContactActions(contactActionTypes),
	reducer: contactReducer,
	...createEntitySelectors(entityName, (state) => state.supplier)
};


