import gql from "graphql-tag";

export class SelectorQueries {
	static suppliers = gql`
		subscription suppliers {
			suppliers {
				id,
				name
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
				name
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
		mutation addSupplier($supplier: SupplierInput) {
			addSupplier(input: $supplier) {
				id
			}
		}
	`;

	static createCategory = gql`
		mutation addCategory($category: CategoryInput) {
			addCategory(input: $category) {
				id
			}
		}
	`;

	static createEvent = gql`
		mutation addEvent($event: EventInput) {
			addEvent(input: $event) {
				id
			}
		}
	`;

	static createTag = gql`
		mutation addTag($tag: TagInput) {
			addTag(input: $tag) {
				id
			}
		}
	`;

	static createSupplierType = gql`
		mutation addSupplierType($supplierType: SupplierTypeInput) {
			addSupplierType(input: $supplierType) {
				id
			}
		}
	`;
}