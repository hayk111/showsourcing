import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class CommentQueries extends GlobalQueries {

	static readonly one = `text`;

	static readonly many = `text`;

	static readonly all = `
		tock tock;
		Who is there ?
		Jack!
		Jack who ?
		Jack ass, don't query all comments !
	`;

}
