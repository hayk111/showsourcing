import { BasicActionTypes, ERM, makeBasicActionTypes, BasicActions } from '~entity';

// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType = makeBasicActionTypes(ERM.comments);
export const CommentActions = new BasicActions(ActionType);
