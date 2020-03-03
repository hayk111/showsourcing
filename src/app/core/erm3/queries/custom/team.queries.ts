import gql from 'graphql-tag';
import { BaseQueries } from '../base.queries';

export class TeamQueries extends BaseQueries {

	queryAll = null;
	queryAllByUser = gql`
		query ListTeamByUser(
			$userId: ID
			$sortDirection: ModelSortDirection
			$filter: ModelTeamUserFilterInput
			$limit: Int
			$nextToken: String
		) {
			listTeamByUser(
				userId: $userId
				sortDirection: $sortDirection
				filter: $filter
				limit: $limit
				nextToken: $nextToken
			) {
				items {
					teamId
					userId
					team {
						id
						name
						ownerUserId
						companyId
						createdByUserId
						createdOn
						lastUpdatedByUserId
						lastUpdatedOn
						_version
						_deleted
						_lastChangedAt
					}
					user {
						id
						email
						firstName
						lastName
						phoneNumber
						preferredLanguage
						avatar
						creationDate
						_version
						_deleted
						_lastChangedAt
					}
					role
					_version
					_deleted
					_lastChangedAt
				}
				nextToken
				startedAt
			}
		}
	`;
}
