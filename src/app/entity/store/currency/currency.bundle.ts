import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM } from '~app/entity/store/entity.model';

export const fromCurrency = makeEntityBundle(ERM.currency.entityName);
