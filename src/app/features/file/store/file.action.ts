import { ERM, BasicActionTypes, makeBasicActions, makeBasicActionTypes } from '~app/shared/entity';

// Generating Action types constants wrapped inside one object
export const FileActionType: BasicActionTypes = makeBasicActionTypes(ERM.files);
export const FileActions = makeBasicActions(FileActionType);
