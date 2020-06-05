import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export interface CustomQueries {
	queryOne?: string;
	queryMany?: string;
	queryAll?: string;
	create?: string;
	update?: string;
	deleteOne?: string;
}

/**
 * Helper to create GraphQL queries that are valid for the realm GraphQL service
 * it will create queries given fields.
 *
 * For Example new QueryBuilder('product', 'products').queryOne('name') will give:
		query product($id: String!) {
			product(id: $id) {
				id
				name
			}
 *
 */
export class QueryBuilder {
	customQueries?: CustomQueries = null;

	// TODO adapt the audits for all cases
	audit = `
		creationDate
		lastUpdatedDate
		createdBy
		deletionDate
		archived
		_lastChangedAt
		_deleted
	`;

	constructor(public entityName: string, customQueries: CustomQueries =  {}) {
		if (!entityName) {
			throw Error('you must define the singular form of the typename');
		}
		this.entityName = this.capitalize(entityName);
		this.customQueries = customQueries;
	}

	// get
	queryOne = (str: string) => {
		const query = this.customQueries.queryOne || `
			query Get${this.entityName}($id: ID!) {
				get${this.entityName}(id: $id) {
					id
					${str}
				}
			}`;
		return gql(query);
	}

	queryManyDefault: string;

	// search
	queryMany = (str: string) => {
		const query = this.customQueries.queryMany || `
			query Search${this.entityName}s(
				$filter: Searchable${this.entityName}FilterInput
				$teamId: ID
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
						teamId
						${str}
						${this.audit}
					}
					nextToken
					total
				}
			}`;
		return gql(query);
	}

	// list
	queryAll = (str: string) => {
		const query = this.customQueries.queryAll || `
			query List${this.entityName}s(
				$teamId: ID
			) {
				list${this.entityName}s(
					teamId: $teamId
				) {
					items {
						id
						${str}
					}
					nextToken
				}
			}`;
		return gql(query);
	}

	create = (str: string) => {
		const mutation = this.customQueries.create || `
			mutation Create${this.entityName}(
				$input: Create${this.entityName}Input!
				$condition: Model${this.entityName}ConditionInput
			) {
				create${this.entityName}(input: $input, condition: $condition) {
					id
					teamId
					${str}
					${this.audit}
				}
			}`;
		return gql(mutation);
	}

	update = (str: string) => {
		const mutation = this.customQueries.update || `
			mutation Update${this.entityName}(
				$input: Update${this.entityName}Input!
				$condition: Model${this.entityName}ConditionInput
			) {
				update${this.entityName}(input: $input, condition: $condition) {
					id
					teamId
					${str}
					${this.audit}
				}
			}`;
		return gql(mutation);
	}

	deleteOne = (str = '') => {
		const mutation = this.customQueries.deleteOne || `
			mutation Delete${this.entityName}(
				$input: Delete${this.entityName}Input!
				$condition: Model${this.entityName}ConditionInput
			) {
				delete${this.entityName}(input: $input, condition: $condition) {
					id
					teamId
					${str}
					${this.audit}
				}
			}`;
		return gql(mutation);
	}

	/** gets the query name from a gql statement */
	getQueryName(query: DocumentNode): string {
		try {
			return (query.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}
	}

	/** gets the content of a graphql query */
	getQueryBody(query: DocumentNode): string {
		return query.loc.source.body;
	}

	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
