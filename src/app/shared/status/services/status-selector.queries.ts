import gql from 'graphql-tag';

export class StatusSelectorQueries {
	static supplierStatus = gql`
		subscription supplierStatus {
			supplierStatuses {
				id,
				name,
				color,
				contrastColor
			}
		}
	`;

	static productStatus = gql`
	subscription productStatus {
		productStatuses {
			id,
			name,
			color,
			contrastColor
		}
	}`;
}