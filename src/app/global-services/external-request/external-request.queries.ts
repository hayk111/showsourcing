import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class ExternalRequestQueries implements GlobalQuery {
	one: any = gql`
	subscription externalRequest($query: String!) {
		externalRequests(query: $query) {
			id,
			name,
			description,
			companyName,
			quotes {
				id,
				status,
				comment,
				name,
				price,
				description,
				minimumOrderQuantity,
				moqDescription,
				innerCarton {
					id,
					height,
					width,
					length,
					unit,
					itemsQuantity,
					weight,
					weightUnit
				},
				masterCarton  {
					id,
					height,
					width,
					length,
					unit,
					itemsQuantity,
					weight,
					weightUnit
				},
				priceMatrix {
					id,
					rows {
						id,
						label,
						price: {
							id,
							currency,
							value,
							baseCurrencyValue,
						}
					}
				}
				leadTimeValue,
				leadTimeUnit,
				sample,
				samplePrice
			},
			descriptor,
			targetedMOQ,
			status,
			supplier {
				id,
				name,
				address,
				country,
				logoImage {
					id,
					fileName
				}
			},
			recipients
		}
	}
	`;

	many = gql`
	subscription externalRequests(
		$take: Int,
		$skip: Int,
		$query: String!,
		$sortBy: String,
		$descending: Boolean) {

		externalRequests(
			take: $take,
			skip: $skip,
			query: $query,
			sortBy: $sortBy,
			descending: $descending) {

			id,
			name,
			description,
			companyName,
			quotes {
				id,
				status,
				comment,
				name,
				price,
				description,
				minimumOrderQuantity,
				moqDescription,
				innerCarton {
					id,
					height,
					width,
					length,
					unit,
					itemsQuantity,
					weight,
					weightUnit
				},
				masterCarton  {
					id,
					height,
					width,
					length,
					unit,
					itemsQuantity,
					weight,
					weightUnit
				},
				priceMatrix {
					id,
					rows {
						id,
						label,
						price: {
							id,
							currency,
							value,
							baseCurrencyValue,
						}
					}
				}
				leadTimeValue,
				leadTimeUnit,
				sample,
				samplePrice
			},
			descriptor,
			targetedMOQ,
			status,
			supplier {
				id,
				name,
				address,
				country,
				logoImage {
					id,
					fileName
				}
			},
			recipients
		}
	}`;

	create = gql`
		mutation createExternalRequest($input: ExternalRequestInput!) {
			updateExternalRequest(input: $input) {
				id
			}
		}
	`;


	update = gql`
		mutation updateExternalRequest($input: ExternalRequestInput!) {
			updateExternalRequest(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation deleteExternalRequest($id: String!) {
			deletEexternalRequest(id: $id)
		}
	`;


	deleteMany = gql`
	mutation deleteExternalRequests($query: String!) {
		deletEexternalRequests(query: $query)
	}
	`;

	all = (str: string) => gql`
		subscription externalRequests {
			externalRequests {
				${str}
			}
		}
	`

}
