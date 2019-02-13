import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ExtendedFieldDefinitionQueries extends GlobalQueries {
	static readonly one = 'id';
	static readonly many = 'id label type order';

}
