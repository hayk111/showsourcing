import { makeEntityBundle } from '~app/entity/store/entity-bundle';

import { ERM } from '../entity.model';

export const fromIncoTerm = makeEntityBundle(ERM.incoTerm.entityName);
