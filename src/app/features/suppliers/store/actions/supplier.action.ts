import { BasicActionTypes, ERM, makeBasicActions, makeBasicActionTypes } from '~entity';

// Extending action constants with specific ones
export interface SupplierActionTypes extends BasicActionTypes {
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: SupplierActionTypes = makeBasicActionTypes(ERM.suppliers);
export const SupplierActions = makeBasicActions(ActionType);
ERM.suppliers.actions = SupplierActions;
