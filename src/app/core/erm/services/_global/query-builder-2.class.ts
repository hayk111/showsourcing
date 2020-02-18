import gql from 'graphql-tag';

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

	constructor(public sing: string) {
		if (!sing) {
			throw Error('you must define the singular form of the typename');
		}
		this.capSing = this.capitalize(sing);
		this.capPlural = this.capSing + 's';
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
	queryOne = (str: string) =>
		gql(`
		query Get${this.capSing}($teamId: String, $id: String!) {
			get${this.capSing}(teamId: $teamId, id: $id) {
				id
				${str}
			}
		}`)

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
	queryMany = (str: string) =>
		gql(`
		query ${this.capPlural}(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean
			) {
			${this.capPlural}(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
				items {
					id,
					${str}
				},
				count
			}
		}`)

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
	queryAll = (str: string) =>
		gql(`
		query List${this.capPlural}(
			$filter: Model${this.capSing}FilterInput,
			$limit: Int,
			$nextToken: String
			) {
			list${this.capPlural}(filter: $filter, limit: $limit, nextToken: $nextToken) {
				items {
					id
					__typename
					${str}
				}
				nextToken
			}
		}`)

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

	create = (str: string) =>
		gql(`
		mutation Create${this.capSing}($input: Create${this.capSing}Input!) {
			create${this.capSing}(input: $input) {
				id,
				${str}
			}
		}`)

	update = (str: string) =>
		gql(`
		mutation update${this.capSing}($input: ${this.capSing}Input!) {
			update${this.capSing}(input: $input) {
				${str}
			}
		}`)

	// updateMany = (str: string) => gql(`
	// mutation updateMany${this.capPlural}($input: [${this.capSing}Input!]){
	// 	create${this.capPlural}(input: $input, updatePolicy: MODIFIED) {
	// 		${str}
	// 	}
	// }
	// `)

	// deleteOne = () => gql(`
	// 	mutation delete${this.capSing}($id: String!) {
	// 		delete${this.capSing}(id: $id)
	// 	}`)

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
