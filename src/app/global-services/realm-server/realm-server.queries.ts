import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class RealmServerQueries extends GlobalQueries {

	static readonly one = `
		hostname,
		httpsPort,
		httpPort
	`;

	static readonly many = `
		hostname,
		httpsPort,
		httpPort
	`;


}
