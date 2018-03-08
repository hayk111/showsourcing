import {
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';

// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType = makeBasicActionTypes(ERM.suppliers);
export const SupplierActions = makeBasicActions(ActionType);
