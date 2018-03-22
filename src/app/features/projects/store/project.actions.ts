import {
	addActionType,
	BasicActions,
	BasicActionTypes,
	EntityRepresentation,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions type + extended types
// ----------------------------------------------------------------------------
export interface ProjectActionTypes extends BasicActionTypes {
	LOAD_PRODUCT_COUNT?: string;
	SET_PRODUCT_COUNT?: string;
	ADD_PRODUCTS?: string;
	ADD_PRODUCTS_SUCCESS?: string;
}
export const ProjectsActionTypes: ProjectActionTypes = makeBasicActionTypes(ERM.projects);
addActionType(ProjectsActionTypes, ERM.projects, 'LOAD_PRODUCT_COUNT');
addActionType(ProjectsActionTypes, ERM.projects, 'SET_PRODUCT_COUNT');
addActionType(ProjectsActionTypes, ERM.projects, 'ADD_PRODUCTS');
addActionType(ProjectsActionTypes, ERM.projects, 'ADD_PRODUCTS_SUCCESS');

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface ProjectActions extends BasicActions {
	loadProductCount?(entityRepr: EntityRepresentation): TypedAction<EntityRepresentation>;
	setProductCount?(items: Array<any>): TypedAction<Array<any>>;
	addProducts?(projects: Array<string>, products: Array<string>): TypedAction<any>;
	addProductsSuccess?(result: Array<any>): TypedAction<any>;
}
export const ProjectActions: ProjectActions = makeBasicActions(ProjectsActionTypes);
ProjectActions.loadProductCount = (entityRepr: EntityRepresentation) => {
	return {
		type: ProjectsActionTypes.LOAD_PRODUCT_COUNT,
		payload: entityRepr,
	};
};
ProjectActions.setProductCount = (items: Array<any>) => {
	return {
		type: ProjectsActionTypes.SET_PRODUCT_COUNT,
		payload: items,
	};
};
ProjectActions.addProducts = (projects: Array<string>, products: Array<string>) => {
	return {
		type: ProjectsActionTypes.ADD_PRODUCTS,
		payload: { projects, products },
	};
};
ProjectActions.addProductsSuccess = (result: Array<any>) => {
	return {
		type: ProjectsActionTypes.ADD_PRODUCTS_SUCCESS,
		payload: result,
	};
};

ERM.projects.actions = ProjectActions;
