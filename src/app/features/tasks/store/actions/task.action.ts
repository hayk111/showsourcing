import {
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';

// Generating Action types constants wrapped inside one object
export const ActionType: BasicActionTypes = makeBasicActionTypes(ERM.tasks);
export const TaskActions = makeBasicActions(ActionType);
