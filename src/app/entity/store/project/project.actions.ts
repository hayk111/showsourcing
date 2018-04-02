import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM, EntityRepresentation } from '../entity.model';
import { TypedAction } from '~utils';

export const entityName = ERM.project.entityName;
// makes project action types
export const projectActionTypes = {
	...makeEntityActionTypes(entityName),
	LOAD_PRODUCT_COUNT: `[${entityName.capitalize()}] Loading product count...`,
	SET_PRODUCT_COUNT: `[${entityName.capitalize()}] Setting product count...`,
	ADD_PRODUCTS: `[${entityName.capitalize()}] Adding Product to project...`,
	ADD_PRODUCTS_SUCCESS: `[${entityName.capitalize()}] Successfully adding product to project...`,
};

// ----------------------------------------------------------------------------
// --------------------------- extending basic actions
// ----------------------------------------------------------------------------

class ProjectActions extends EntityActions {
	loadProductCount(entityRepr: EntityRepresentation) {
		return {
			type: this.actionType.LOAD_PRODUCT_COUNT,
			payload: entityRepr,
		};
	}

	setProductCount(items: Array<any>) {
		return {
			type: this.actionType.SET_PRODUCT_COUNT,
			payload: items,
		};
	}

	addProducts(projects: Array<string>, products: Array<string>) {
		return {
			type: this.actionType.ADD_PRODUCTS,
			payload: { projects, products },
		};
	}
	addProductsSuccess(result: Array<any>) {
		return {
			type: this.actionType.ADD_PRODUCTS_SUCCESS,
			payload: result,
		};
	}
}

export const projectActions = new ProjectActions(projectActionTypes);
// TODO: cedric centralize those action mapping
ERM.project.actions = ProjectActions;
