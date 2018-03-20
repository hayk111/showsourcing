import { EntityRepresentation, EntityTarget } from '~entity';
import { Filter } from 'app/shared/filters/index';

export interface LoadParams {
	// url entities api/team/:teamId/product/:productId/comment
	url?: string;
	// alternatively of a url we can give the entity loaded
	// example : loaded: Comment, base: Team, from: Product
	// this allows to resolve problems were we aren't sure
	// if the user is already loaded
	loaded?: EntityRepresentation;
	loadedId?: string;
	base?: EntityRepresentation;
	from?: EntityTarget;

	// filters etc
	filters?: Array<Filter>;
	// pagination
	pagination?: boolean;
	// how many items are taken in each pagination page.
	take?: number;
	drop?: number;
	// recurring calls every x milliseconds.
	recurring?: boolean;
}
