import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestQueries extends GlobalQueries {

	static readonly one = `
	 id,
	 action,
	 payload,
	 status,
	 creationDate,
	 lastUpdatedDate,
	 reply,
	 deleted
	`;

	static readonly many = `
	id,
	action,
	payload,
	status,
	creationDate,
	lastUpdatedDate,
	reply,
	deleted
 `;

	static readonly all = `
	id,
	action,
	payload,
	status,
	creationDate,
	lastUpdatedDate,
	reply,
	deleted
`;
}
