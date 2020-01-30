import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export abstract class ExtendedFieldDefinitionQueries extends GlobalQueries {
	static readonly one = 'label type order metadata';
	static readonly many = 'label type order metadata';
	static readonly all = 'label type order metadata';
}



