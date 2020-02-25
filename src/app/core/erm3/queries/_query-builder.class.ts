import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

/** Audit found on every entity */
const AUDIT = `
	creationDate
	lastUpdatedDate
	createdBy
	deletionDate
	archived
	_lastChangedAt
	_deleted
	_version
`;


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

	// search
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
						teamId
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
	}

	create = (str: string) => {
		return gql`
			mutation Create${this.entityName}(
				$input: Create${this.entityName}Input!
				$condition: Model${this.entityName}ConditionInput
			) {
				create${this.entityName}(input: $input, condition: $condition) {
					id
					teamId
					${str}
					${AUDIT}
				}
			}`;
	}

	update = (str: string) => {
		return gql`
			mutation Update${this.entityName}(
				$input: Update${this.entityName}Input!
				$condition: Model${this.entityName}ConditionInput
			) {
				update${this.entityName}(input: $input, condition: $condition) {
					id
					teamId
					${str}
					${AUDIT}
				}
			}`;
	}

	delete = (str = '') => {
		return gql`
			mutation Delete${this.entityName}(
				$input: Delete${this.entityName}Input!
				$condition: Model${this.entityName}ConditionInput
			) {
				delete${this.entityName}(input: $input, condition: $condition) {
					id
					teamId
					${str}
					${AUDIT}
				}
			}`;
	}

	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}


}
