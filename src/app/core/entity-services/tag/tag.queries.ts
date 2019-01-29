import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class TagQueries extends GlobalQueries {

	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"tags" query:"archived == false AND deleted == false") { ... on ProductCollection { count }}`;
	// tslint:disable-next-line:max-line-length
	static readonly suppliersLinked = `suppliersLinked: _linkingObjects(objectType: "Supplier" property:"tags" query:"deleted == false") { ... on SupplierCollection { count }}`;


	static readonly many = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
		${TagQueries.productsLinked}
		${TagQueries.suppliersLinked}
	`;

}
