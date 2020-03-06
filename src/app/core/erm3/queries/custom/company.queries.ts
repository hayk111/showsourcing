import gql from 'graphql-tag';
import { BaseQueries } from '../base.queries';

export class CompanyQueries extends BaseQueries {

	queryAllByOwner = gql`
		query queryAll(
			$ownerUserId: ID
			$sortDirection: ModelSortDirection
			$filter: ModelCompanyFilterInput
			$limit: Int
			$nextToken: String
		) {
			listCompanyByOwner(
				ownerUserId: $ownerUserId
				sortDirection: $sortDirection
				filter: $filter
				limit: $limit
				nextToken: $nextToken
			) {
				__typename
				items {
					__typename
					id
					name
					ownerUserId
					owner {
						__typename
						id
						email
						firstName
						lastName
						phoneNumber
						preferredLanguage
						avatar
						creationDate
					}
					# createdByUserId
					# createdBy {
					# 	__typename
					# 	id
					# 	email
					# 	firstName
					# 	lastName
					# 	phoneNumber
					# 	preferredLanguage
					# 	avatar
					# 	creationDate
					# }
					createdOn
					lastUpdatedByUserId
					lastUpdatedBy {
						__typename
						id
						email
						firstName
						lastName
						phoneNumber
						preferredLanguage
						avatar
						creationDate
					}
					lastUpdatedOn
				}
			}
		}
	`;
}
