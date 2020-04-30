import gql from 'graphql-tag';
import { Typename } from '../typename.type';
import { QueryType } from './query-type.enum';

/** Audit found on every entity */
// _version must be written in cache for update and delete of any entity.
const AUDIT = ``;
// _version
// _lastChangedAt
// _deleted

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
	constructor(private typename: Typename) {
		if (!typename) {
			throw Error('you must define the singular form of the typename');
		}
	}

	// get
	[QueryType.GET] = (str: string) => {
		return gql`
			query Get${this.typename}(
				$id: ID!
			) {
				get${this.typename}(
					id: $id
				) {
					${str}
					${AUDIT}
				}
			}`;
	};

	[QueryType.SEARCH_BY] = (str: string) => (byTypeName: Typename) => {
		return gql`
			query Search${this.typename}sBy${byTypeName}s(
				$${byTypeName.toLowerCase()}Ids: [String!]!
				$take: Int
				$skip: Int
				$filter: SearchFilterInput
				$sort: SearchSortInput
			) {
				search${this.typename}sBy${byTypeName}s(
					${byTypeName.toLowerCase()}Ids: $${byTypeName.toLowerCase()}Ids
					take: $take
					skip: $skip
					filter: $filter
					sort: $sort
				) {
					items {
						id
						${str}
						${AUDIT}
					}
					count
				}
			}`;
	};

	[QueryType.LIST_BY] = (str: string): Record<string, any> => (byProperty: string) => {
		const ownerVerbose = byProperty === 'Owner' ? 'User' : ''; // the param for Owner is $ownerUser
		const paramEntityName = byProperty.charAt(0).toLowerCase() + byProperty.slice(1) + ownerVerbose;
		const byId = paramEntityName + 'Id';

		let byPropertyString = '';
		if (this.typename !== 'TeamUser' || (this.typename === 'TeamUser' && byProperty === 'User')) {
			// temporary solution for TeamUser, as we don't have a query TeamUsers
			byPropertyString = byProperty === 'Team' ? 's' : 'By' + byProperty; // listEntity is "by Team" in default
		}
		return gql`
			query List${this.typename}${byPropertyString}(
				${this.typename === 'PropertyOption' ? '$type: ModelStringKeyConditionInput' : ''}
				${this.typename !== 'Vote' ? '$byId: ID' : ''}
				$sortDirection: ModelSortDirection
				$filter: Model${this.typename}FilterInput
				$limit: Int
				$nextToken: String
			) {
				list${this.typename}${byPropertyString}(
					${this.typename === 'PropertyOption' ? 'type: $type' : ''}
					${this.typename !== 'Vote' ? `${byId}: $byId` : ''}
					sortDirection: $sortDirection
					filter: $filter
					limit: $limit
					nextToken: $nextToken
				) {
					items {
						${str}
						${AUDIT}
					}
					nextToken
				}
			}`;
	};

	[QueryType.SYNC] = (str: string): Record<string, any> => {
		return gql`
			query Sync${this.typename}(
				$filter: Model${this.typename}FilterInput,
				$lastSync: AWSTimestamp,
				$limit: Int,
				$nextToken: String
			) {
				sync${this.typename}s(
					filter: $filter,
					lastSync: $lastSync,
					limit: $limit,
					nextToken: $nextToken) {
						items {
							${str}
							${AUDIT}
						}
						nextToken
				  }
			}`;
	};

	[QueryType.CREATE] = (str: string) => {
		return gql`
			mutation Create${this.typename}(
				$input: Create${this.typename}Input!
			) {
				create${this.typename}(input: $input) {
					${str}
					${AUDIT}
				}
			}`;
	};

	[QueryType.UPDATE_MANY] = (str: string) => (inputs: any[]) => {
		const aliasParams = inputs.map(
			(input, i) => `
			$input${i}: Update${this.typename}Input!`
		);
		const aliasMutations = inputs.map(
			(input, i) => `
				alias${i}: update${this.typename}(input: $input${i}) {
					${str}
					${AUDIT}
				}`
		);
		return gql`
			mutation UpdateMany${this.typename}(
				${aliasParams}
			) {
				${aliasMutations}
			}`;
	};

	[QueryType.UPDATE] = (str: string) => {
		return gql`
			mutation Update${this.typename}(
				$input: Update${this.typename}Input!
			) {
				update${this.typename}(input: $input) {
					${str}
					${AUDIT}
				}
			}`;
	};

	[QueryType.UPDATE_STATUS] = (str: string) => {
		return gql`
		mutation Update${this.typename}Status(
			$entityId: ID!
			$statusId: ID!
		) {
			update${this.typename}Status(${this.typename.toLowerCase()}Id: $entityId, statusId: $statusId) {
				${str}
			}
  	}`;
	};

	[QueryType.DELETE_MANY] = (str: string) => (inputs: any[]) => {
		const aliasParams = inputs.map(
			(input, i) => `
			$input${i}: Delete${this.typename}Input!`
		);
		const aliasMutation = inputs.map(
			(input, i) => `
				alias${i}: delete${this.typename}(input: $input${i}) {
					${str}
					${AUDIT}
				}`
		);
		return gql`
			mutation DeleteMany${this.typename}(
				${aliasParams}
			) {
				${aliasMutation}
			}`;
	};

	[QueryType.DELETE] = (str = '') => {
		return gql`
			mutation Delete${this.typename}(
				$input: Delete${this.typename}Input!
			) {
				delete${this.typename}(input: $input) {
					${str}
					${AUDIT}
				}
			}`;
	};
}
