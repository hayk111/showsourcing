import { Filter } from '~shared/filters';

import { EntityRepresentation, EntityTarget } from './../models';

export interface LoadParams {
	// url entities api/team/:teamId/product/:productId/comment
	url?: string;
	// alternatively of a url we can give the entity loaded
	// example : loaded: Comment, base: Team, from: Product
	// this allows to resolve problems were we aren't sure
	// if the user is already loaded
	loaded?: EntityRepresentation;
	base?: EntityRepresentation;
	from?: EntityTarget;

	// filters etc
	filters?: Array<Filter>;
	// pagination
	pagination?: boolean;
	take?: number;
	drop?: number;
	// recurring calls every x milliseconds.
	recurring?: boolean;
	maxCounter?: number;
}
