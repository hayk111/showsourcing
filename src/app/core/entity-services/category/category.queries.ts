import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class CategoryQueries extends GlobalQueries {

	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"category" query:"archived == false") { ... on ProductCollection { count }}`;
	// tslint:disable-next-line:max-line-length
	static readonly suppliersLinked = `suppliersLinked: _linkingObjects(objectType: "Supplier" property:"categories") { ... on SupplierCollection { count }}`;

	static readonly one = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
		${CategoryQueries.productsLinked}
		${CategoryQueries.suppliersLinked}
		`;

	static readonly many = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
		${CategoryQueries.productsLinked}
		${CategoryQueries.suppliersLinked}
		`;

}
