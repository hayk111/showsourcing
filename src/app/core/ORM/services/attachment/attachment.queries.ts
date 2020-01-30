import { GlobalQueries } from '~core/ORM/services/_global/global-queries.class';
import { UserQueries } from '../user/user.queries';

export abstract class AttachmentQueries extends GlobalQueries {

	static readonly one = `
		fileName
		url
		size
		createdBy { ${UserQueries.userWithAvatar} }
		creationDate
	`;

	static readonly many = `
		fileName
		url
		size
		createdBy { ${UserQueries.userWithAvatar} }
		creationDate
	`;

}
