import { User } from '~core/orm/models/user.model';
import { uuid } from '~utils/uuid.utils';

export class SupplierVote {
	id: string;
	user: User;
	value: number;
	creationDate: string;
	__typename?= 'SupplierVote';

	constructor(config: SupplierVoteConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface SupplierVoteConfig {
	value: number;
	user: User;
	creationDate: string;
}

export const mockSupplierVotes = [
	{
		id: 'fake-vote-id-1',
		value: 100,
		user: {
			id: 'fake-user-id-1',
			firstName: 'Fake Name 1',
			lastName: 'Fake Last 1',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-2',
		value: 20,
		user: {
			id: 'fake-user-id-2',
			firstName: 'Fake Name 2',
			lastName: 'Fake Last 2',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-3',
		value: 20,
		user: {
			id: 'fake-user-id-3',
			firstName: 'Fake Name 3',
			lastName: 'Fake Last 3',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-4',
		value: 20,
		user: {
			id: 'fake-user-id-4',
			firstName: 'Fake Name 4',
			lastName: 'Fake Last 4',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-5',
		value: 20,
		user: {
			id: 'fake-user-id-5',
			firstName: 'Fake Name 5',
			lastName: 'Fake Last 5',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-6',
		value: 40,
		user: {
			id: 'fake-user-id-6',
			firstName: 'Fake Name 6',
			lastName: 'Fake Last 6',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-7',
		value: 60,
		user: {
			id: 'fake-user-id-7',
			firstName: 'Fake Name 7',
			lastName: 'Fake Last 7',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-8',
		value: 60,
		user: {
			id: 'fake-user-id-8',
			firstName: 'Fake Name 8',
			lastName: 'Fake Last 8',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-9',
		value: 80,
		user: {
			id: 'fake-user-id-9',
			firstName: 'Fake Name 9',
			lastName: 'Fake Last 9',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-10',
		value: 80,
		user: {
			id: 'fake-user-id-10',
			firstName: 'Fake Name 10',
			lastName: 'Fake Last 10',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-11',
		value: 80,
		user: {
			id: 'fake-user-id-11',
			firstName: 'Fake Name 11',
			lastName: 'Fake Last 11',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-12',
		value: 80,
		user: {
			id: 'fake-user-id-12',
			firstName: 'Fake Name 12',
			lastName: 'Fake Last 12',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-12',
		value: 80,
		user: {
			id: 'fake-user-id-12',
			firstName: 'Fake Name 12',
			lastName: 'Fake Last 12',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-13',
		value: 80,
		user: {
			id: 'fake-user-id-13',
			firstName: 'Fake Name 13',
			lastName: 'Fake Last 13',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-14',
		value: 100,
		user: {
			id: 'fake-user-id-14',
			firstName: 'Fake Name 14',
			lastName: 'Fake Last 14',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-15',
		value: 100,
		user: {
			id: 'fake-user-id-15',
			firstName: 'Fake Name 15',
			lastName: 'Fake Last 15',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-16',
		value: 100,
		user: {
			id: 'fake-user-id-16',
			firstName: 'Fake Name 16',
			lastName: 'Fake Last 16',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-17',
		value: 100,
		user: {
			id: 'fake-user-id-17',
			firstName: 'Fake Name 17',
			lastName: 'Fake Last 17',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-18',
		value: 100,
		user: {
			id: 'fake-user-id-18',
			firstName: 'Fake Name 18',
			lastName: 'Fake Last 18',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-19',
		value: 100,
		user: {
			id: 'fake-user-id-19',
			firstName: 'Fake Name 19',
			lastName: 'Fake Last 19',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-20',
		value: 100,
		user: {
			id: 'fake-user-id-20',
			firstName: 'Fake Name 20',
			lastName: 'Fake Last 20',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-21',
		value: 100,
		user: {
			id: 'fake-user-id-21',
			firstName: 'Fake Name 21',
			lastName: 'Fake Last 21',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-22',
		value: 100,
		user: {
			id: 'fake-user-id-22',
			firstName: 'Fake Name 22',
			lastName: 'Fake Last 22',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-23',
		value: 100,
		user: {
			id: 'fake-user-id-23',
			firstName: 'Fake Name 23',
			lastName: 'Fake Last 23',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-24',
		value: 100,
		user: {
			id: 'fake-user-id-24',
			firstName: 'Fake Name 24',
			lastName: 'Fake Last 24',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-25',
		value: 100,
		user: {
			id: 'fake-user-id-25',
			firstName: 'Fake Name 25',
			lastName: 'Fake Last 25',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-26',
		value: 100,
		user: {
			id: 'fake-user-id-26',
			firstName: 'Fake Name 26',
			lastName: 'Fake Last 26',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	},
	{
		id: 'fake-vote-id-27',
		value: 100,
		user: {
			id: 'fake-user-id-27',
			firstName: 'Fake Name 27',
			lastName: 'Fake Last 27',
			__typename: 'User'
		},
		__typename: 'SupplierVote'
	}
];

