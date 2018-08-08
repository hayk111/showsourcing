import gql from 'graphql-tag';

export class BaseQueries {
	oneDefaultSelection = 'name';
	manyDefaultSelection = 'name';
	allDefaultSelection = 'name';
	updateDefaultSelection = '';
	createDefaultSelection = '';
	capSing: string;
	capPlural: string;

	constructor(public sing: string, public plural: string) {
		if (!sing || !plural) {
			throw Error('you must define the singular and plural form of the typename');
		}
		this.capSing = this.capitalize(sing);
		this.capPlural = this.capitalize(plural);
	}

	/** generates a graphql query to select all entity of a given type that
	* that correspond to the query.
	* the query is named one because it's used in details page to select all
	* entities that have a specific id (which will return only one result).
	*/
	one = (str: string = this.oneDefaultSelection) => gql`
		subscription ${ this.sing}($query: String!) {
			${ this.plural}(query: $query) {
				id
				${ str}
			}
		}`;

	many = (str: string = this.manyDefaultSelection) => gql`
		subscription ${this.plural}(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean
			) {
			${this.plural}(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
				id,
				${str}
			}
		}`;

	all = (str: string = this.allDefaultSelection) => gql`
		subscription ${this.plural} {
			${this.plural} {
				id
				${str}
			}
		}`;

	create = (str: string = this.createDefaultSelection) => gql`
		mutation create${this.capSing}($input: ${this.capSing}Input!) {
			update${this.capSing}(input: $input) {
				id,
				${str}
			}
		}`;

	update = (str: string = this.updateDefaultSelection) => gql`
		mutation update${this.capSing}($input: ${this.capSing}Input!) {
			update${this.capSing}(input: $input) {
				id
			}
		}`;

	deleteOne = gql`
		mutation delete${this.capSing}($id: String!) {
			delete${this.capSing}(id: $id)
		}`;

	deleteMany = gql`
		mutation delete${this.capPlural}($query: String!) {
			delete${this.capPlural}(query: $query)
		}`;


	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}