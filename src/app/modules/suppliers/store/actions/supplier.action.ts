import { Action } from '@ngrx/store';
import { TypedAction } from '../../../store/utils/typed-action.interface';
import { Supplier } from '../../model/supplier.model';
import { Patch } from '../../../store/utils/patch.interface';
import { addActionType, makeBasicActionTypes, makeBasicActions, BasicActionTypes } from '../../../store/action/entities/_entity.action.factory';
import { entityRepresentationMap } from '../../../store/utils/entities.utils';

// Extending action constants with specific ones
export interface SupplierActionTypes extends BasicActionTypes {
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: SupplierActionTypes = makeBasicActionTypes(entityRepresentationMap.suppliers);
export const SupplierActions = makeBasicActions(ActionType);
entityRepresentationMap.suppliers.actions = SupplierActions;
