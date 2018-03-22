import { BasicActions, EntityRepresentation, ERM, makeBasicActionTypes } from '~entity';
import { TypedAction } from '~utils';

// makes project action types
export const actionTypes = {
	...makeBasicActionTypes(ERM.projects),
	LOAD_PRODUCT_COUNT: `[${ERM.projects.entityName.capitalize()}] Loading product count...`,
	SET_PRODUCT_COUNT: `[${ERM.projects.entityName.capitalize()}] Setting product count...`,
	ADD_PRODUCTS: `[${ERM.projects.entityName.capitalize()}] Adding Product to project...`,
	ADD_PRODUCTS_SUCCESS: `[${ERM.projects.entityName.capitalize()}] Successfully adding product to project...`,
};

// ----------------------------------------------------------------------------
// --------------------------- extending basic actions
// ----------------------------------------------------------------------------

class ProjectActions extends BasicActions {
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

export const projectActions = new ProjectActions(actionTypes);
// TODO: cedric centralize those action mapping
ERM.projects.actions = ProjectActions;
