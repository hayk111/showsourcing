import gql from 'graphql-tag';

export class SelectorQueries {
	static suppliers = gql`
		subscription suppliers {
			suppliers {
				id,
				name,
				logoImage {
					id,
					fileName
				}
			}
		}
	`;

	static categories = gql`
		subscription categories {
			categories {
				id,
				name
			}
		}
	`;

	static events = gql`
		subscription events {
			events {
				id,
				alias,
				description {
					id,
					logoImage {
						id,
						fileName
					}
				}
			}
		}
	`;

	static tags = gql`
		subscription tags {
			tags {
				id,
				name
			}
		}
	`;

	static supplierTypes = gql`
		subscription supplierTypes {
			supplierTypes {
				id,
				name
			}
		}
	`;

	static createSupplier = gql`
		mutation addSupplier($input: SupplierInput) {
			addSupplier(input: $input) {
				id
			}
		}
	`;

	static createCategory = gql`
		mutation addCategory($input: CategoryInput) {
			addCategory(input: $input) {
				id
			}
		}
	`;

	static createEvent = gql`
		mutation addEvent($input: EventInput) {
			addEvent(input: $input) {
				id
			}
		}
	`;

	static createTag = gql`
		mutation addTag($input: TagInput) {
			addTag(input: $input) {
				id
			}
		}
	`;

	static createSupplierType = gql`
		mutation addSupplierType($input: SupplierTypeInput) {
			addSupplierType(input: $input) {
				id
			}
		}
	`;
}
