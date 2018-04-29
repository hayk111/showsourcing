import { Contact } from '~app/features/supplier/store/contacts/contact.model';
import { AppImage } from '~app/entity/store/image/image.model';
import { Patch } from '~app/entity/utils/patch.interface';
import { EntityTarget } from '~app/entity';

export enum ContactActionType {
	LOAD = '[Contact Supplier] Loading...',
	SET = '[Contact Supplier] Setting...',
	CREATE = '[Contact Supplier] Creating...',
	REPLACE = '[Contact Supplier] Replacing...',
	PATCH = '[Contact Supplier] Patching...',
	CREATE_IMG = '[Contact Supplier] Creating img',
	LINK_IMG = '[Contact Supplier] Linking img',
	SET_PREVIEW = '[Contact Supplier] setting preview',
	CHANGE_IMG = '[Contact Supplier] change img'
}

export class ContactActions {
	static load() {
		return {
			type: ContactActionType.LOAD
		};
	}

	static create(contact: Contact) {
		return {
			type: ContactActionType.CREATE,
			payload: contact
		};
	}

	static replace(swaps: Array<Contact>) {
		return {
			type: ContactActionType.REPLACE,
			payload: swaps
		};
	}

	static set(contacts: Array<Contact>) {
		return {
			type: ContactActionType.SET,
			payload: contacts
		};
	}

	static createImg(img: AppImage) {
		return {
			type: ContactActionType.CREATE_IMG,
			payload: img
		};
	}

	static patch(patch: Patch) {
		return {
			type: ContactActionType.PATCH,
			payload: patch,
		};
	}

	static linkImg(img, contactId: string) {
		return {
			type: ContactActionType.LINK_IMG,
			payload: { img, contactId }
		};
	}

	static setPreview(img) {
		return {
			type: ContactActionType.SET_PREVIEW,
			payload: img
		};
	}

	static changeImg(img, contactId) {
		return {
			type: ContactActionType.CHANGE_IMG,
			payload: { img, contactId }
		};
	}
}
