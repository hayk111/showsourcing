import { BaseQueries } from './_base.queries';
import { EntityName } from '~core/erm/entity-name.enum';
import { ProductQueries } from './custom/product.queries';
import { SupplierQueries } from './custom/supplier.queries';


export const queryMap = {
	[EntityName.TAG]: new BaseQueries('tag'),
	[EntityName.CATEGORY]: new BaseQueries('category'),
	[EntityName.PRODUCT]: new ProductQueries(),
	[EntityName.SUPPLIER]: new SupplierQueries()
};
