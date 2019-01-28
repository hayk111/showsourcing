import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class TagQueries extends GlobalQueries {

	// tslint:disable-next-line:max-line-length
	static readonly productsCount = `productsCount:  _count(type: "Product", field: "tags.id", query:"archived == false AND deleted == false")`;
	static readonly suppliersCount = `suppliersCount:  _count(type: "Supplier", field: "tags.id", query:"deleted == false")`;
	// tslint:disable-next-line:max-line-length
	// static readonly productsCount = `products: _LinkingObjects(objectType: "Product" property:"tag" query:"archived == false AND deleted == false") { ... on ProductCollection { count }}`;
	// tslint:disable-next-line:max-line-length
	// static readonly suppliersCount = `suppliers: _LinkingObjects(objectType: "Supplier" property:"tag" query:"deleted == false") { ... on SupplierCollection { count }}`;


	static readonly many = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
		${TagQueries.productsCount},
		${TagQueries.suppliersCount}
	`;

}
