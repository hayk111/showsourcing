import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM } from '../entity.model';

export const fromProject = makeEntityBundle(ERM.project.entityName);
