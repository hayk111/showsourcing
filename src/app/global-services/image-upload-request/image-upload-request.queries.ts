import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ImageUploadRequestQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('imageUploadRequest', 'imageUploadRequests');
	}

	oneDefaultSelection = `
	id,
	status,
	uploadUrl,
	formData
	`;

	manyDefaultSelection = `
	id,
	status,
	uploadUrl,
	formData
	`;

	createDefaultSelection = `
	id,
	status,
	uploadUrl,
	formData
	`;
}
