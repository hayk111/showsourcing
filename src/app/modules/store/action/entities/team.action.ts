import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Team } from '../../model/entities/team.model';
import { User } from '../../model/entities/user.model';
import { entityRepresentationMap } from '../../utils/entities.utils';
import { makeBasicActions, makeBasicActionTypes } from './_entity.action.factory';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.teams);
export const TeamActions = makeBasicActions(ActionType);
entityRepresentationMap.teams.actions = TeamActions;
