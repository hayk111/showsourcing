import gql from 'graphql-tag';
import { BaseQueries } from '../base.queries';
import { EntityName } from '~core/erm/models';

export class TeamUserQueries extends BaseQueries {

	constructor() {
		super(EntityName.TEAM_USER, 'team { id, name } role');
	}

	queryAll = gql`
		query ListTeamUserByUser {
			listTeamUserByUser {
				items {
					team {
						id
						name
					}
					role
				}
			}
		}
	`;
}
