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

	constructor(public sing: string, public plural: string) {
		if (!sing || !plural) {
			throw Error('you must define the singular and plural form of the typename');
		}
		this.capSing = this.capitalize(sing);
		this.capPlural = this.capitalize(plural);
	}

	// select one actually select many entities that respond to a query.
	// but we will take the first one in the global service
	// at the time of writting this there is no way of subscribing to one
	// via id
	selectOne = (str: string) => gql(`
		subscription ${this.sing}($query: String!) {
			${ this.plural}(query: $query) {
				items {
					id
					${str}
				},
				count
			}
		}`)

	queryOne = (str: string) => gql(`
		query ${this.sing}($id: String!) {
			${this.sing}(id: $id) {
				id
				${str}
			}
		}`)

	selectMany = (str: string) => gql(`
		subscription ${this.plural}(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean
			) {
			${this.plural}(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
				items {
					id,
					${str}
				},
				count
			}
		}`)

	queryMany = (str: string) => gql(`
		query ${this.plural}(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean
			) {
			${this.plural}(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
				items {
					id,
					${str}
				},
				count
			}
		}`)

	selectAll = (str: string) => gql(`
		subscription ${this.plural} {
			${this.plural} {
				items {
					id
					${str}
				},
				count
			}
		}`)

	queryAll = (str: string) => gql(`
		query ${this.plural}(
			$query: String!,
			$sortBy: String,
			$descending: Boolean
			) {
			${this.plural}(query: $query, sortBy: $sortBy, descending: $descending) {
				items {
					id
					${str}
				},
				count
			}
		}`)

	queryCount = () => gql(`
		query ${this.plural}Count($query: String) {
			${this.plural}(query: $query) {
				count
			}
		}`)

	create = (str: string) => gql(`
		mutation create${this.capSing}($input: ${this.capSing}Input!) {
			update${this.capSing}(input: $input) {
				id,
				${str}
			}
		}`)

	update = (str: string) => gql(`
		mutation update${this.capSing}($input: ${this.capSing}Input!) {
			update${this.capSing}(input: $input) {
				${str}
			}
		}`)

	deleteOne = () => gql(`
		mutation delete${this.capSing}($id: String!) {
			delete${this.capSing}(id: $id)
		}`)

	deleteMany = () => gql(`
		mutation delete${this.capPlural}($query: String!) {
			delete${this.capPlural}(query: $query)
		}`)

	openSubscription = (query: string) => gql(`
		mutation create${this.capSing}Subscription {
			create${this.capSing}Subscription(name: "${this.sing}-subscription", query: "${query}") {
				items {
					id@skip(if: true)
				}
			}
		}
	`)

	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
