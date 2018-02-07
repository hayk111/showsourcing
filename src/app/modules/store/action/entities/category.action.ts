import { Action } from '@ngrx/store';
import { Category } from '../../model/entities/category.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { Patch } from '../../utils/patch.interface';
import { entityRepresentationMap } from '../../utils/entities.utils';
import { makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.categories);
export const CategoryActions = makeBasicActions(ActionType);
entityRepresentationMap.categories.actions = CategoryActions;

