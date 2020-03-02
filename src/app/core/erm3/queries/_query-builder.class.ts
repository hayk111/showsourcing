import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

/** Audit found on every entity */
const AUDIT = `
`;
	// _lastChangedAt
	// _deleted
	// _version

/**
 * Helper to create GraphQL queries that are valid for the realm GraphQL service
 * it will create queries given fields.
 *
 * For Example new QueryBuilder('product').queryOne('name') will give:
		query product($id: String!) {
			product(id: $id) {
				id
				name
			}
 *
 */
export class QueryBuilder {
	constructor(private entityName: string) {
		if (!entityName) {
			throw Error('you must define the singular form of the typename');
		}
		this.entityName = this.capitalize(entityName);
	}

	// get
	queryOne = (str: string) => {
		return gql`
			query Get${this.entityName}(
				$id: ID!
			) {
				get${this.entityName}(
					id: $id
				) {
					id
					${str}
					${AUDIT}
				}
			}`;
	}

	queryManyDefault: string;

	// search // TODO update to fit the new environment when we have search queries
	queryMany = (str: string) => {
		return gql`
			query Search${this.entityName}s(
				$filter: Searchable${this.entityName}FilterInput
				$id: ModelIDKeyConditionInput
				$sort: Searchable${this.entityName}SortInput
				$limit: Int
				$nextToken: String
			) {
				search${this.entityName}s(
					filter: $filter
					sort: $sort
					limit: $limit
					nextToken: $nextToken
				) {
					items {
						id
						${str}
						${AUDIT}
					}
					nextToken
					total
				}
			}`;
	}

	// list
	queryAll = (str: string) => {
		return gql`
			query List${this.entityName}s(
				$filter: Model${this.entityName}FilterInput
				$limit: Int
				$nextToken: String
			) {
				list${this.entityName}s(
					filter: $filter,
					limit: $limit,
					nextToken: $nextToken
				) {
					items {
						id
						${str}
					}
					nextToken
				}
			}`;
	}

	create = (str: string) => {
		return gql`
			mutation Create${this.entityName}(
				$input: Create${this.entityName}Input!
			) {
				create${this.entityName}(input: $input) {
					id
					${str}
					${AUDIT}
				}
			}`;
	}

	update = (str: string) => {
		return gql`
			mutation Update${this.entityName}(
				$input: Update${this.entityName}Input!
			) {
				update${this.entityName}(input: $input) {
					id
					${str}
					${AUDIT}
				}
			}`;
	}

	delete = (str = '') => {
		return gql`
			mutation Delete${this.entityName}(
				$input: Delete${this.entityName}Input!
			) {
				delete${this.entityName}(input: $input) {
					id
					${str}
					${AUDIT}
				}
			}`;
	}

	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
