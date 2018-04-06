import { EntityActions, makeEntityActionTypes, EntityActionTypes } from '../entity.action.factory';
import { EntityTarget, ERM } from '../entity.model';
import { Project } from '../project';
import { Tag } from '../tag';

const entityName = ERM.product.entityName;

export interface ProductActionTypes extends EntityActionTypes {
	REQUEST_PDF: string;
	REQUEST_FEEDBACK: string;
	REQUEST_FEEDBACK_SUCCESS: string;
	VOTE: string;
	// tags
	CREATE_TAG: string;
	ADD_TAG: string;
	REMOVE_TAG: string;
	// projects
	CREATE_PROJECT: string;
	ADD_PROJECT: string;
	REMOVE_PROJECT: string;
}
// makes product action types
export const actionTypes = {
	...makeEntityActionTypes(entityName),
	REQUEST_PDF: `[${entityName.capitalize()}] Requesting pdf...`,
	REQUEST_FEEDBACK: `[${entityName.capitalize()}] Requesting feedback...`,
	REQUEST_FEEDBACK_SUCCESS: `[${entityName.capitalize()}] Request feedback success...`,
	VOTE: `[${entityName.capitalize()}] Voting...`,
	// tags
	CREATE_TAG: `[${entityName.capitalize()}] Creating tag for product...`,
	ADD_TAG: `[${entityName.capitalize()}] Adding existing tag to product...`,
	REMOVE_TAG: `[${entityName.capitalize()}] Removing tag from product...`,
	// projects
	CREATE_PROJECT: `[${entityName.capitalize()}] Creating project for product...`,
	ADD_PROJECT: `[${entityName.capitalize()}] Adding project to product...`,
	REMOVE_PROJECT: `[${entityName.capitalize()}] Removing project from product...`,
};


class ProductActions extends EntityActions<ProductActionTypes> {
	// additional actions / extensions of the base
	requestPdf(id: string) {
		return {
			type: this.actionType.REQUEST_PDF,
			payload: id,
		};
	}

	requestFeedback(productsIds: Array<string>, recipientsIds: Array<string>) {
		return {
			type: this.actionType.REQUEST_FEEDBACK,
			payload: { productsIds, recipientsIds },
		};
	}

	requestFeedbackSuccess(result: any) {
		return {
			type: this.actionType.REQUEST_FEEDBACK_SUCCESS,
			payload: result,
		};
	}

	vote(id: string, value: 0 | 100) {
		return {
			type: this.actionType.VOTE,
			payload: { id, value },
		};
	}

	createTag(tag: Tag, productId: string) {
		return {
			type: this.actionType.CREATE_TAG,
			payload: { tag, productId },
		};
	}

	addTag(tag: Tag, productId: string) {
		return {
			type: this.actionType.ADD_TAG,
			payload: { tag, productId },
		};
	}

	removeTag(tag: Tag, productId: string) {
		return {
			type: this.actionType.REMOVE_TAG,
			payload: { tag, productId },
		};
	}

	createProject(project: Project, productId: string) {
		return {
			type: this.actionType.CREATE_PROJECT,
			payload: { project, productId },
		};
	}

	addProject(project: Project, productId: string) {
		return {
			type: this.actionType.ADD_PROJECT,
			payload: { project, productId },
		};
	}

	removeProject(project: Project, productId: string) {
		return {
			type: this.actionType.REMOVE_PROJECT,
			payload: { project, productId },
		};
	}
}

// keeping capitalization for backward compatibility
export const productActions = new ProductActions(actionTypes);
