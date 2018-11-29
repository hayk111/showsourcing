import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ExportRequestQueries extends GlobalQueries {

	static readonly one = `
      format,
      type,
      query,
      status,
      documentUrl,
      errors
  `;

	static readonly many = `
      format,
      type,
      query,
      status,
      documentUrl,
      errors
  `;
}
