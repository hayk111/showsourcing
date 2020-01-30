import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ExportRequestQueries extends GlobalQueries {

	static readonly createdBy = `createdBy { id, firstName, lastName, avatar { id, urls { id, url } } }`;


	static readonly one = `
      format,
      type,
      query,
      status,
      documentUrl,
			errors,
			creationDate
			${ExportRequestQueries.createdBy}
			`;

	static readonly many = `
      format,
      type,
      query,
      status,
      documentUrl,
      errors
			creationDate
			${ExportRequestQueries.createdBy}
  `;
}
