import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM } from '../entity.model';

export const fromSupplierStatus = makeEntityBundle(ERM.supplierStatus.entityName);
