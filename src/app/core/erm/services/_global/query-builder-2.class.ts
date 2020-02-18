import gql from 'graphql-tag';

interface CustomQueries {
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
	audit: string = `
		creationDate
		lastUpdatedDate
		createdBy
		deletionDate
		archived
		_lastChangedAt
		_deleted
		_version
	`;

	constructor(public entityName: string, customQueries?: CustomQueries) {
		if (!entityName) {
			throw Error("you must define the singular form of the typename");
		}
		this.entityName = this.capitalize(entityName);
		this.customQueries = customQueries;
	}

	// TODO selectOne is no longer used (need to be removed from the app)

	// get
	queryOne = (str: string) => {
		let query = `
			query Get${this.entityName}($teamId: ID!, $id: ID!) {
				get${this.entityName}(teamId: $teamId, id: $id) {
					id
					teamId
					${str}
					${this.audit}
				}
			}`;
		if (this.customQueries?.queryOne) {
			query = this.customQueries.queryOne;
		}
		gql(query);
	};

	// TODO selectMany is no longer used (need to be removed from the app)


	// TODO replace the query with a real search query (this one doesn't exist on the queries.graphql but should look's like this)
	// search
	queryMany = (str: string) => {
		let query = `
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
		if (this.customQueries?.queryMany) {
			query = this.customQueries.queryMany;
		}
		gql(query);
	};

	// TODO selectAll is no longer used (need to be removed from the app)
	// list
	queryAll = (str: string) => {
		let query = `
			query List${this.entityName}(
				$teamId: ID
				$id: ModelIDKeyConditionInput
				$filter: ModelContactFilterInput
				$limit: Int
				$nextToken: String
				$sortDirection: ModelSortDirection
			) {
				list${this.entityName}(
					teamId: $teamId
					id: $id
					filter: $filter
					limit: $limit
					nextToken: $nextToken
					sortDirection: $sortDirection
				) {
					items {
						id
						teamId
						${str}
						${this.audit}
					}
					nextToken
				}
			}`;
		if (this.customQueries?.queryAll) {
			query = this.customQueries.queryAll;
		}
		gql(query);
	};

	// TODO use Search to replace queryCount


	// TODO selectCount is no longer used (need to be removed from the app)


	create = (str: string) => {
		let mutation = `
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
		if (this.customQueries?.create) {
			mutation = this.customQueries.create;
		}
		gql(mutation);
	};

	update = (str: string) => {
		let mutation = `
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
		if (this.customQueries?.update) {
			mutation = this.customQueries.update;
		}
		gql(mutation);
	};

	// TODO updateMany is no longer used (need to be managed in global service)


	deleteOne = (str = "") => {
		let mutation = `
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
		if (this.customQueries?.deleteOne) {
			mutation = this.customQueries.deleteOne;
		}
		gql(mutation);
	};


	// TODO deleteMany is no longer used (need to be managed in global service)


	// TODO openSubscription is no longer used (need to be removed from the app)


	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
