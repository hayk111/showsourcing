import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestQueries extends GlobalQueries {

	static readonly one = `
	 id,
	 action,
	 payload,
	 status,
	 creationDate,
	 lastUpdatedDate,
	 deleted
	`;

	static readonly many = `
	id,
	action,
	payload,
	status,
	creationDate,
	lastUpdatedDate,
	deleted
 `;
}
