import gql from 'graphql-tag';
import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';

export class ImageUploadRequestQueries extends GlobalQueries {


	static readonly one = `
	id,
	status,
	uploadUrl,
	formData
	`;

	static readonly many = `
	id,
	status,
	uploadUrl,
	formData
	`;

	static readonly create = `
	id,
	status,
	uploadUrl,
	formData
	`;
}
