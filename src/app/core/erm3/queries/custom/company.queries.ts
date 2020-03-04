import gql from 'graphql-tag';
import { BaseQueries } from '../base.queries';

export class CompanyQueries extends BaseQueries {

	queryAll = gql`
		query queryAll(
			$ownerUserId: ID
		) {
			listCompanyByOwner(
				ownerUserId: $ownerUserId
			) {
				__typename
				items {
					__typename
					id
					name
				}
				nextToken
				startedAt
			}
		}
	`;
}
