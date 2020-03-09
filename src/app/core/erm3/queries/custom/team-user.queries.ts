import gql from 'graphql-tag';
import { BaseQueries } from '../base.queries';


export class TeamUserQueries extends BaseQueries {

	constructor() {
		super('TeamUser', 'team { id, name } role');
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
