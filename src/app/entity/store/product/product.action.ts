import { EntityActions, makeEntityActionTypes } from '../entity.action.factory';
import { EntityTarget, ERM } from '../entity.model';
import { Project } from '../project';
import { Tag } from '../tag';


// makes product action types
export const actionTypes = {
	...makeEntityActionTypes(ERM.product),
	REQUEST_PDF: `[${ERM.product.entityName.capitalize()}] Requesting pdf...`,
	REQUEST_FEEDBACK: `[${ERM.product.entityName.capitalize()}] Requesting feedback...`,
	REQUEST_FEEDBACK_SUCCESS: `[${ERM.product.entityName.capitalize()}] Request feedback success...`,
	VOTE: `[${ERM.product.entityName.capitalize()}] Voting...`,
	CREATE_TAG: `[${ERM.product.entityName.capitalize()}] Creating tag for product...`,
	ADD_TAG: `[${ERM.product.entityName.capitalize()}] Adding existing tag to product...`,
	REMOVE_TAG: `[${ERM.product.entityName.capitalize()}] Removing tag from product...`,
	CREATE_PROJECT: `[${ERM.product.entityName.capitalize()}] Creating project for product...`,
	ADD_PROJECT: `[${ERM.product.entityName.capitalize()}] Adding project to product...`,
	REMOVE_PROJECT: `[${ERM.product.entityName.capitalize()}] Removing project from product...`,
	LOAD_LATEST_FOR_TARGET: `[${ERM.product.entityName.capitalize()}] Loading latest for supplier...`
};


class ProductActions extends EntityActions {
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

	loadLatestForTarget(target: EntityTarget) {
		return {
			type: this.actionType.LOAD_LATEST_FOR_TARGET,
			payload: target
		};
	}
}

// keeping capitalization for backward compatibility
export const productActions = new ProductActions(actionTypes);