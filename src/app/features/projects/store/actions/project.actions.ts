import {
	addActionType,
	BasicActions,
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

import { EntityRepresentation } from './../../../../shared/entity/models/entities.model';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions type + extended types
// ----------------------------------------------------------------------------
export interface ProjectActionTypes extends BasicActionTypes {
	LOAD_PRODUCT_COUNT?: string;
	SET_PRODUCT_COUNT?: string;
}
export const ProjectsActionTypes: ProjectActionTypes = makeBasicActionTypes(
	ERM.projects
);
addActionType(ProjectsActionTypes, ERM.projects, 'LOAD_PRODUCT_COUNT');
addActionType(ProjectsActionTypes, ERM.projects, 'SET_PRODUCT_COUNT');

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface ProjectActions extends BasicActions {
	loadProductCount?(
		entityRepr: EntityRepresentation
	): TypedAction<EntityRepresentation>;
	setProductCount?(items: Array<any>): TypedAction<Array<any>>;
}
export const ProjectActions: ProjectActions = makeBasicActions(
	ProjectsActionTypes
);
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

ERM.suppliers.actions = ProjectActions;
