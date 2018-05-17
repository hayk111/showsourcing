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
	`
}