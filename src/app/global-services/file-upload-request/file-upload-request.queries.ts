import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class FileUploadRequestQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('fileUploadRequest', 'FileUploadRequests');
	}

	oneDefaultSelection = `
	status,
	uploadUrl,
	formData
	`;

	manyDefaultSelection = `
	status,
	uploadUrl,
	formData
	`;

	createDefaultSelection = `
	status,
	uploadUrl,
	formData
	`;
}
