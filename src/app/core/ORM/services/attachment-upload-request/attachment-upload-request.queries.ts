import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class AttachmentUploadRequestQueries extends GlobalQueries {


	static readonly one = `
	status,
	uploadUrl,
	formData
	`;

	static readonly many = `
	status,
	uploadUrl,
	formData
	`;

	static readonly create = `
	status,
	uploadUrl,
	formData
	`;
}
