import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const commentActionType = makeEntityActionTypes(ERM.comment.entityName);
export const commentActions = new EntityActions(commentActionType);
