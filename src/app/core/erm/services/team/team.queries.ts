import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';


export class TeamQueries extends GlobalQueries {

	static readonly one = `name, creationDate, realmPath, realmServerName, ownerUser { id, firstName, lastName }, status`;
	static readonly many = `name, creationDate, realmPath, realmServerName, ownerUser { id, firstName, lastName }, status`;
	createDefaultSelection = `name, creationDate, realmPath, realmServerName, status`;
	static readonly all = `name, creationDate, realmPath, realmServerName, status, ownerUser { id, firstName, lastName }`;

}
