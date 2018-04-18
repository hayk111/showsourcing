import { EntityRepresentation, EntityTarget } from '~entity';
import { Filter } from 'app/shared/filters/index';


export interface ApiParams {
	// url entities api/team/:teamId/product/:productId/comment
	url?: string;
	// alternatively of a url we can give the entity target
	// example : target: Comment, base: Team, from: Product
	// this allows to resolve problems were we aren't sure
	// if the user is already target
	target?: EntityRepresentation;
	targetId?: string;
	base?: EntityRepresentation;
	from?: EntityTarget;
	// parameters
	filters?: Array<Filter>;
	sort?: { sortBy: string, sortOrder: 'asc' | 'desc' };
	pagination?: { drop?: number };
	// recurring calls every x milliseconds.
	recurring?: boolean;

	// body when post
	body?: any;
}
