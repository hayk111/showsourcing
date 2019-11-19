import { GlobalQueries } from '~entity-services/_global/global-queries.class';


export class UserQueries extends GlobalQueries {

	static readonly userWithAvatar = `
		id,
		firstName,
		lastName,
		avatar {
			id, urls { id, url }
		},
	`;

	static readonly one = `
		id,
		firstName,
		lastName,
		email,
		phoneNumber,
		currentTeam {
			id, name, status
		},
		preferredLanguage,
		avatar {
			id, urls { id, url }, orientation, imageType
		},
		companyName
	`;

	static readonly many = `
		id,
		firstName,
		lastName,
		email,
		phoneNumber,
		currentTeam {
			id, name, status
		},
		preferredLanguage,
		avatar {
			id, urls { id, url }, orientation, imageType
		},
		companyName
	`;

	static readonly all = `
		id,
		firstName,
		lastName,
		email,
		phoneNumber,
		currentTeam {
			id, name, status
		},
		preferredLanguage,
		avatar {
			id, urls { id, url }, orientation, imageType
		},
		companyName
	`;


}
