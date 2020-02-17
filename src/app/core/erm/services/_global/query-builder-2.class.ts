import gql from "graphql-tag";

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
	capSing: string;
	capPlural: string;
	customQueries?: CustomQueries = null;

	audit: string = `
		_creationDate
    _deletionDate
    _lastUpdatedDate
		_deleted
		_version
	`;

	constructor(public sing: string, customQueries: CustomQueries) {
		if (!sing) {
			throw Error("you must define the singular form of the typename");
		}
		this.capSing = this.capitalize(sing);
		this.capPlural = this.capSing + "s";
		this.customQueries = customQueries;
	}

	// select one actually select many entities that respond to a query.
	// but we will take the first one in the global service
	// at the time of writting this there is no way of subscribing to one
	// via id

	// selectOne = (str: string) => gql(`
	// 	subscription ${this.capSing}($query: String!) {
	// 		${ this.capPlural}(query: $query) {
	// 			items {
	// 				id
	// 				${str}
	// 			},
	// 			count
	// 		}
	// 	}`)

	// get
	queryOne = (str: string) => {
		let query = `
query Get${this.capSing}($teamId: ID!, $id: ID!) {
  get${this.capSing}(teamId: $teamId, id: $id) {
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

	// selectMany = (str: string) => gql(`
	// 	subscription ${this.capPlural}(`
	// 	+ true ? `$take: Int,` : ``
	// 	+ `$skip: Int,
	// 		$query: String!,
	// 		$sortBy: String,
	// 		$descending: Boolean
	// 		) {
	// 		${this.capPlural}(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
	// 			items {
	// 				id,
	// 				${str}
	// 			},
	// 			count
	// 		}
	// 	}`)

	// search
	queryMany = (str: string) => {
		let query = `
		query Search${this.capPlural}(
  $filter: Searchable${this.capSing}FilterInput
  $sort: Searchable${this.capSing}SortInput
  $limit: Int
  $nextToken: String
) {
  search${this.capPlural}(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
			${str}
			${this.audit}
    }
    nextToken
    total
  }
}
`;
		if (this.customQueries?.queryMany) {
			query = this.customQueries.queryMany;
		}
		gql(query);
	};

	// selectAll = (str: string) => gql(`
	// 	subscription ${this.capPlural} {
	// 		${this.capPlural} {
	// 			items {
	// 				id
	// 				${str}
	// 			},
	// 			count
	// 		}
	// 	}`)

	// list
	queryAll = (str: string) => {
		let query = `
	query List${this.capSing}(
  $teamId: ID
  $id: ModelIDKeyConditionInput
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  list${this.capSing}(
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

	// ? find equivalent
	// queryCount = () => gql(`
	// 	query ${this.capPlural}Count($query: String) {
	// 		${this.capPlural}(query: $query) {
	// 			count
	// 		}
	// 	}`)

	// selectCount = () => gql(`
	// 	subscription ${this.capPlural}Count($query: String) {
	// 		${this.capPlural}(query: $query) {
	// 			count
	// 		}
	// 	}`)

	create = (str: string) => {
		let mutation = `
		mutation Create${this.capSing}(
  $input: Create${this.capSing}Input!
  $condition: Model${this.capSing}ConditionInput
) {
  create${this.capSing}(input: $input, condition: $condition) {
    id
		teamId
		${str}
		${this.audit}
  }
}}`;
		if (this.customQueries?.create) {
			mutation = this.customQueries.create;
		}
		gql(mutation);
	};

	update = (str: string) => {
		let mutation = `
		mutation Update${this.capSing}(
  $input: Update${this.capSing}Input!
  $condition: Model${this.capSing}ConditionInput
) {
  update${this.capSing}(input: $input, condition: $condition) {
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

	// updateMany = (str: string) => gql(`
	// mutation updateMany${this.capPlural}($input: [${this.capSing}Input!]){
	// 	create${this.capPlural}(input: $input, updatePolicy: MODIFIED) {
	// 		${str}
	// 	}
	// }
	// `)

	deleteOne = (str = "") => {
		let mutation = `
		mutation Delete${this.capSing}(
  $input: Delete${this.capSing}Input!
  $condition: Model${this.capSing}ConditionInput
) {
  delete${this.capSing}(input: $input, condition: $condition) {
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

	// deleteMany = () => gql(`
	// 	mutation delete${this.capPlural}($query: String!) {
	// 		delete${this.capPlural}(query: $query)
	// 	}`)

	// openSubscription = (query: string) => gql(`
	// 	mutation create${this.capSing}Subscription {
	// 		create${this.capSing}Subscription(name: "${this.capSing}-subscription", query: "${query}") {
	// 			items {
	// 				id@skip(if: true)
	// 			}
	// 		}
	// 	}
	// `)

	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
