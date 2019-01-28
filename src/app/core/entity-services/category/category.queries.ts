import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class CategoryQueries extends GlobalQueries {

	// tslint:disable-next-line:max-line-length
	static readonly productsCount = `productsCount:  _count(type: "Product", field: "category.id", query: "archived == false AND deleted == false")`;
	static readonly suppliersCount = `suppliersCount:  _count(type: "Supplier", field: "categories.id", query: "deleted == false")`;

	static readonly one = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
		`;

	static readonly many = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
		`;

}
