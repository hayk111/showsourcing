import gql from 'graphql-tag';
import { GlobalQuery } from '~global-services/_global/global.query.interface';
import { BaseQueries } from '~global-services/_global/base-query.class';


export class TeamQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('team', 'teams');
	}

	oneDefaultSelection = `name, realmPath, realmServerName, ownerUser { id, firstName, lastName }, status`;
	manyDefaultSelection = `name, realmPath, realmServerName, ownerUser { id, firstName, lastName }, status`;
	createDefaultSelection = `name, realmPath, realmServerName, status`;
	allDefaultSelection = `name, realmPath, realmServerName, status, ownerUser { id, firstName, lastName }`;

}
