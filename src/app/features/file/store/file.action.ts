import { ERM, BasicActionTypes, makeBasicActionTypes, BasicActions } from '~app/shared/entity';

// Generating Action types constants wrapped inside one object
export const fileActionType: BasicActionTypes = makeBasicActionTypes(ERM.files);
export const fileActions = new BasicActions(fileActionType);
