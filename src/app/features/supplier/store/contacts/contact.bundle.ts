import { makeEntityBundle } from '~entity/store/entity-bundle';
import { EntityActionTypes } from '~app/entity';


export const fromSupplierContact = makeEntityBundle('contact', (state) => state.supplier);

