import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ProductVoteQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('productVote', 'productVotes');
	}

}
