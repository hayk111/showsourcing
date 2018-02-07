import { TypedAction } from '../../utils/typed-action.interface';
import { Tag } from '../../model/entities/tag.model';
import { Patch } from '../../utils/patch.interface';
import { makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.tags);
export const TagActions = makeBasicActions(ActionType);
entityRepresentationMap.tags.actions = TagActions;
