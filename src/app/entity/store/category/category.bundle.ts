import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM } from '~app/entity/store/entity.model';

export const fromCategory = makeEntityBundle(ERM.category.entityName);

ERM.category.actions = fromCategory.Actions;
