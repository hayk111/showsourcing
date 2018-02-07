import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Supplier } from '../../model/entities/supplier.model';
import { Patch } from '../../utils/patch.interface';
import { makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.suppliers);
export const SupplierActions = makeBasicActions(ActionType);
entityRepresentationMap.suppliers.actions = SupplierActions;
