import { makeEntityBundle } from '~entity/store/entity-bundle';

export const fromSupplierProduct = makeEntityBundle('product', (state) => state.supplier);

