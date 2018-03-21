import {
	addActionType,
	BasicActions,
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
	EntityRepresentation,
} from '~entity';
import { TypedAction } from '~utils';
import { Tag } from '~app/app-root/store';
import { Project } from '~app/features/projects';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions type + extended types
// ----------------------------------------------------------------------------
export interface ProductActionTypes extends BasicActionTypes {
	REQUEST_PDF?: string;
	REQUEST_FEEDBACK?: string;
	REQUEST_FEEDBACK_SUCCESS?: string;
	VOTE?: string;

	CREATE_TAG?: string;
	ADD_TAG?: string;
	REMOVE_TAG?: string;

	CREATE_PROJECT?: string;
	ADD_PROJECT?: string;
	REMOVE_PROJECT?: string;
}

// makes product action types
export function makeProductActionTypes(repr: EntityRepresentation): ProductActionTypes {
	// using uppercase for backward compatibility with enums
	return {
		...makeBasicActionTypes(repr),
		REQUEST_PDF: `[${repr.entityName.capitalize()}] Requesting pdf...`,
		REQUEST_FEEDBACK: `[${repr.entityName.capitalize()}] Requesting feedback...`,
		REQUEST_FEEDBACK_SUCCESS: `[${repr.entityName.capitalize()}] Request feedback success...`,
		VOTE: `[${repr.entityName.capitalize()}] Voting...`,
		CREATE_TAG: `[${repr.entityName.capitalize()}] Creating tag for product...`,
		ADD_TAG: `[${repr.entityName.capitalize()}] Adding existing tag to product...`,
		REMOVE_TAG: `[${repr.entityName.capitalize()}] Removing tag from product...`,
		CREATE_PROJECT: `[${repr.entityName.capitalize()}] Creating project for product...`,
		ADD_PROJECT: `[${repr.entityName.capitalize()}] Adding project to product...`,
		REMOVE_PROJECT: `[${repr.entityName.capitalize()}] Removing project from product...`,
	};
}

export const ProductActionTypes = makeProductActionTypes(ERM.product);

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------

export interface ProductActions extends BasicActions {
	requestPdf?(id: string): TypedAction<string>;
	requestFeedback?(productsIds: Array<string>, recipientsIds: Array<string>): TypedAction<any>;
	requestFeedbackSuccess?(result: any): TypedAction<any>;
	vote?(id: string, value: 0 | 100): TypedAction<any>;
	createTag(tag: Tag, productId: string): TypedAction<any>;
	addTag(tag: Tag, productId: string): TypedAction<any>;
	removeTag(tag: Tag, productId: string): TypedAction<any>;
	createProject(project: Project, productId: string): TypedAction<any>;
	addProject(project: Project, productId: string): TypedAction<any>;
	removeProject(project: Project, productId: string): TypedAction<any>;
}
export const ProductActions: ProductActions = makeBasicActions(ProductActionTypes) as ProductActions;

// additional actions / extensions of the base
ProductActions.requestPdf = (id: string) => {
	return {
		type: ProductActionTypes.REQUEST_PDF,
		payload: id,
	};
};
ProductActions.requestFeedback = (productsIds: Array<string>, recipientsIds: Array<string>) => {
	return {
		type: ProductActionTypes.REQUEST_FEEDBACK,
		payload: { productsIds, recipientsIds },
	};
};
ProductActions.requestFeedbackSuccess = (result: any) => {
	return {
		type: ProductActionTypes.REQUEST_FEEDBACK_SUCCESS,
		payload: result,
	};
};
ProductActions.vote = (id: string, value: 0 | 100) => {
	return {
		type: ProductActionTypes.VOTE,
		payload: { id, value },
	};
};
ProductActions.createTag = (tag: Tag, productId: string) => {
	return {
		type: ProductActionTypes.CREATE_TAG,
		payload: { tag, productId },
	};
};

ProductActions.addTag = (tag: Tag, productId: string) => {
	return {
		type: ProductActionTypes.ADD_TAG,
		payload: { tag, productId },
	};
};
ProductActions.removeTag = (tag: Tag, productId: string) => {
	return {
		type: ProductActionTypes.REMOVE_TAG,
		payload: { tag, productId },
	};
};
ProductActions.createProject = (project: Project, productId: string) => {
	return {
		type: ProductActionTypes.CREATE_PROJECT,
		payload: { project, productId },
	};
};
ProductActions.addProject = (project: Project, productId: string) => {
	return {
		type: ProductActionTypes.ADD_PROJECT,
		payload: { project, productId },
	};
};
ProductActions.removeProject = (project: Project, productId: string) => {
	return {
		type: ProductActionTypes.REMOVE_PROJECT,
		payload: { project, productId },
	};
};
