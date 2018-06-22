import gql from 'graphql-tag';

export class DataManagementQueries {

	static selectCategories = `
		id,
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
	`;

	static selectSupplierTags = `
	`;

	static selectProductTags = `
	`;

	static selectEvents = `
	`;
}
