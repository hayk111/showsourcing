import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ProjectQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('project', 'projects');
	}

	oneDefaultSelection = `name, description, lastUpdatedDate, creationDate, createdBy { id, firstName, lastName }, logoImage { id, fileName }`;
	manyDefaultSelection = `name, createdBy { id, firstName, lastName }, productCount, lastUpdatedDate, creationDate, description`;

}
