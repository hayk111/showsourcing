import { EntityTarget } from '../utils/entities.utils';

export interface Vote {
	id?: string;
	value: number;
	target: EntityTarget;
	pending?: boolean;
	userId?: string;
	productId?: string;
}
