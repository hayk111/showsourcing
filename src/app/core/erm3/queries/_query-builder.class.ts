import gql from 'graphql-tag';
import { Typename } from '../typename.type';

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

	byTypenames:  Array<Typename | 'Owner'> = ['Team'];
	constructor(private typename: Typename) {
		if (!typename) {
			throw Error('you must define the singular form of the typename');
		}
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
	}

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
	}

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
	}

	queryBy = (str: string): Record<string, any> => {
		const queryByObject = {};
		this.byTypenames.forEach(byEntity => {
			const ownerVerbose = byEntity === 'Owner' ? 'User' : ''; // the param for Owner is $ownerUser
			const paramEntityName = byEntity.charAt(0).toLowerCase() + byEntity.slice(1) + ownerVerbose;
			const byId = paramEntityName + 'Id';
			const queryBy = gql`
			query List${this.typename}By${byEntity}(
				$byId: ID
				$sortDirection: ModelSortDirection
				$filter: Model${this.typename}FilterInput
				$limit: Int
				$nextToken: String
			) {
				list${this.typename}By${byEntity}(
					${byId}: $byId
					sortDirection: $sortDirection
					filter: $filter
					limit: $limit
					nextToken: $nextToken
				) {
					items {
						# ${byId} ? do we need this ?
						${str}
					}
					nextToken
					startedAt
				}
			}`;
			queryByObject[byEntity] = queryBy;
		});
		return queryByObject;
	}

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
	}

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
	}

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
	}
}
