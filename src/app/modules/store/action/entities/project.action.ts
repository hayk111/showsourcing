import { TypedAction } from '../../utils/typed-action.interface';
import { Project } from '../../model/entities/project.model';
import { Patch } from '../../utils/patch.interface';
import { makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.projects);
export const ProjectActions = makeBasicActions(ActionType);
entityRepresentationMap.projects.actions = ProjectActions;
