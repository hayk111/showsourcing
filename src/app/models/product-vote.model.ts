import { User } from './user.model';

export class ProductVote {
	id: string;
	user: User;
	value: number;
}