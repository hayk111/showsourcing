import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class FileUploadRequestQueries extends GlobalQueries {


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
