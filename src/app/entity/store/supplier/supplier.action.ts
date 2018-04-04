import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';
import { TypedAction } from '~utils';
import { Tag } from '~app/entity/store/tag';
import { Category } from '~app/entity/store/category';

const entityName = ERM.supplier.entityName;

export const supplierActionTypes = {
	...makeEntityActionTypes(entityName),
	LOAD_PRODUCT_COUNT: `[${entityName.capitalize()}] Loading product count...`,
	ADD_PRODUCT_COUNT: `[${entityName.capitalize()}] Setting product count...`,
	// tag
	CREATE_TAG: `[${entityName.capitalize()}] Creating tag for supplier...`,
	ADD_TAG: `[${entityName.capitalize()}] Adding existing tag to supplier...`,
	REMOVE_TAG: `[${entityName.capitalize()}] Removing tag from supplier...`,
	// category
	CREATE_CATEGORY: `[${entityName.capitalize()}] Creating category for supplier...`,
	ADD_CATEGORY: `[${entityName.capitalize()}] Adding existing category to supplier...`,
	REMOVE_CATEGORY: `[${entityName.capitalize()}] Removing category from supplier...`,
};

export class SupplierActions extends EntityActions {
	// additional actions / extensions of the base
	loadProductCount() {
		return {
			type: this.actionType.LOAD_PRODUCT_COUNT,
		};
	}

	addProductCount(countObject: { [key: string]: number }) {
		return {
			type: this.actionType.ADD_PRODUCT_COUNT,
			payload: countObject,
		};
	}

	createTag(tag: Tag, supplierId: string) {
		return {
			type: this.actionType.CREATE_TAG,
			payload: { tag, supplierId },
		};
	}

	addTag(tag: Tag, supplierId: string) {
		return {
			type: this.actionType.ADD_TAG,
			payload: { tag, supplierId },
		};
	}

	removeTag(tag: Tag, supplierId: string) {
		return {
			type: this.actionType.REMOVE_TAG,
			payload: { tag, supplierId },
		};
	}

	createCategory(category: Category, supplierId: string) {
		return {
			type: this.actionType.CREATE_TAG,
			payload: { category, supplierId },
		};
	}

	addCategory(category: Category, supplierId: string) {
		return {
			type: this.actionType.ADD_TAG,
			payload: { category, supplierId },
		};
	}

	removeCategory(category: Category, supplierId: string) {
		return {
			type: this.actionType.REMOVE_TAG,
			payload: { category, supplierId },
		};
	}
}

export const supplierActions = new SupplierActions(supplierActionTypes);

ERM.supplier.actions = SupplierActions;
