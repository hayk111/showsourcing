import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Supplier } from '../../model/entities/supplier.model';
import { Patch } from '../../utils/patch.interface';
import { addActionType, makeBasicActionTypes, makeBasicActions, BasicActionTypes } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';

// Extending action constants with specific ones
export interface SupplierActionTypes extends BasicActionTypes {
	ADD_SUPPLIERS?: string;
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: SupplierActionTypes = makeBasicActionTypes(entityRepresentationMap.suppliers);
addActionType(ActionType, entityRepresentationMap.product, 'ADD_SUPPLIERS');

export const SupplierActions = makeBasicActions(ActionType);
entityRepresentationMap.suppliers.actions = SupplierActions;
