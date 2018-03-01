import { BasicActionTypes, entityRepresentationMap, makeBasicActions, makeBasicActionTypes } from '~entity';

// Extending action constants with specific ones
export interface SupplierActionTypes extends BasicActionTypes {
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: SupplierActionTypes = makeBasicActionTypes(entityRepresentationMap.suppliers);
export const SupplierActions = makeBasicActions(ActionType);
entityRepresentationMap.suppliers.actions = SupplierActions;
