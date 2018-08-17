import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class CommentQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('comment', 'comments')
	}

	oneDefaultSelection = ` text `;

	manyDefaultSelection = ` text `;

	allDefaultSelection = `
		tock tock;
		Who is there ?
		Jack!
		Jack who ?
		Jack ass, don't query all comments !
	`;

}
