import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM } from '~app/entity/store/entity.model';


export const fromCustomField = makeEntityBundle(ERM.customField.entityName);