import { User } from './user.model';
import { uuid } from '~utils/uuid.utils';

export class ProductVote {
	id: string;
	user: User;
	value: number;
	constructor(config: ProductVoteConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface ProductVoteConfig {
	value: number;
	user: User;
}

