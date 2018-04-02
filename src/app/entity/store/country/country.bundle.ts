import { makeEntityBundle } from '../entity-bundle';
import { ERM } from '~app/entity/store/entity.model';

export const fromCountry = makeEntityBundle(ERM.country.entityName);
