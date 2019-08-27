import { Observable } from 'rxjs';

export interface GetStreamResponse {
	next: string;
	results: GetStreamGroup[] | GetStreamActivity[];
}

export interface GetStreamGroup {
	activities: GetStreamActivity[];
	activity_count: number;
	actor_count: number;
	created_at: string;
	group: string;
	id: string;
	is_read?: boolean;
	is_seen?: boolean;
	updated_at: string;
	verb: string;
}

export interface GetStreamActivity {
	actor: string;
	actor_name: string;
	foreign_id: string;
	id: string;
	object: string;
	origin: string;
	target: string;
	target_id: string;
	team_id?: string;
	time: string;
	verb: string;
}

export interface GetStreamNotification {
	duration: string;
	next: string;
	results: GetStreamGroup[];
	unread: number;
	unseen: number;
}

export const notificationsMock: GetStreamNotification = {
	duration: '34ms',
	unread: 15,
	unseen: 15,
	next: '',
	results: [{
		activities: [{
			actor: '4f8baf51-3886-4893-b4a5-1c29b6b5f6ab',
			actor_name: 'Antoine Praet',
			foreign_id: 'create_task:4354902c-bbb8-4b0f-b3d0-52c60d94c5d8',
			id: '73312160-bad9-11e9-8080-800145c763de',
			object: '4354902c-bbb8-4b0f-b3d0-52c60d94c5d8',
			origin: null,
			target: 'product',
			target_id: 'd96979db-ace1-419d-9e90-db5787901b29',
			team_id: '642c327f-ac96-43cd-897b-8f04fe2dbbed',
			time: '2019-08-09T19:11:11.478000',
			verb: 'create_task',
		}],
		activity_count: 4,
		actor_count: 2,
		created_at: '2019-08-09T12:28:30.630040',
		group: 'create_task_2019-08-09',
		id: '72390601-baaa-11e9-8080-800105d097d9.create_task_2019-08-09',
		is_read: false,
		is_seen: false,
		updated_at: '2019-08-09T13:34:43.505715',
		verb: 'create_task',
	}]
};
