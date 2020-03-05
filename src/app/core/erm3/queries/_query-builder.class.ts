import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { EntityName } from '../entity-name.type';

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
<<<<<<< HEAD
	constructor(private typename: string) {
		if (!typename) {
			throw Error('you must define the singular form of the typename');
		}
		this.typename = this.capitalize(typename);
=======
	constructor(private entityName: EntityName) {
		if (!entityName) {
			throw Error('you must define the singular form of the typename');
		}
>>>>>>> queryBy in progress
	}

	// get
	queryOne = (str: string) => {
		return gql`
			query Get${this.typename}(
				$id: ID!
			) {
				get${this.typename}(
					id: $id
				) {
					id
					${str}
					${AUDIT}
				}
			}`;
	};

	queryManyDefault: string;

	// search // TODO update to fit the new environment when we have search queries
	queryMany = (str: string) => {
		return gql`
			query Search${this.typename}s(
				$filter: Searchable${this.typename}FilterInput
				$id: ModelIDKeyConditionInput
				$sort: Searchable${this.typename}SortInput
				$limit: Int
				$nextToken: String
			) {
				search${this.typename}s(
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
	};

	// list
	queryAll = (str: string) => {
		return gql`
			query List${this.typename}s {
				list${this.typename}s {
					items {
						id
						${str}
					}
				}
			}`;
	};

	queryBy = (str: string) => {
		return gql`
			query ListTeamByUser(
				$userId: ID
				$sortDirection: ModelSortDirection
				$filter: ModelTeamUserFilterInput
				$limit: Int
				$nextToken: String
			) {
				listTeamByUser(
					userId: $userId
					sortDirection: $sortDirection
					filter: $filter
					limit: $limit
					nextToken: $nextToken
				) {
					__typename
					items {
						__typename
						teamId
						userId
						team {
							__typename
							id
							name
							ownerUserId
							companyId
							createdByUserId
							createdOn
							lastUpdatedByUserId
							lastUpdatedOn
							_version
							_deleted
							_lastChangedAt
						}
						user {
							__typename
							id
							email
							firstName
							lastName
							phoneNumber
							preferredLanguage
							avatar
							creationDate
							_version
							_deleted
							_lastChangedAt
						}
						role
						_version
						_deleted
						_lastChangedAt
					}
					nextToken
					startedAt
				}
			}
		`;
	};

	create = (str: string) => {
		return gql`
			mutation Create${this.typename}(
				$input: Create${this.typename}Input!
			) {
				create${this.typename}(input: $input) {
					id
					${str}
					${AUDIT}
				}
			}`;
	};

	update = (str: string) => {
		return gql`
			mutation Update${this.typename}(
				$input: Update${this.typename}Input!
			) {
				update${this.typename}(input: $input) {
					id
					${str}
					${AUDIT}
				}
			}`;
	};

	delete = (str = '') => {
		return gql`
			mutation Delete${this.typename}(
				$input: Delete${this.typename}Input!
			) {
				delete${this.typename}(input: $input) {
					id
					${str}
					${AUDIT}
				}
			}`;
	};

}
