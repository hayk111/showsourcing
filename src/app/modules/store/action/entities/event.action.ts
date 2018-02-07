import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Patch } from '../../utils/patch.interface';
import { entityRepresentationMap } from '../../utils/entities.utils';
import { makeBasicActions, makeBasicActionTypes } from './_entity.action.factory';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.events);
export const EventActions = makeBasicActions(ActionType);
entityRepresentationMap.events.actions = EventActions;
