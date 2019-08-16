import { Observable } from 'rxjs';

export interface GetStreamResponse {
	next: string;
	results: GetStreamGroup[] | GetStreamActivity[];
}

export interface GetStreamGroup {
	activities: GetStreamActivity[];
	activity_count: number;
	actor_count: number;
	created_at: Date;
	group: string;
	id: string;
	is_read?: boolean;
	is_seen?: boolean;
	updated_at: Date;
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
	time: Date;
	verb: string;
}

export interface GetStreamNotification {
	duration: string;
	next: string;
	results: GetStreamGroup[];
	unread: number;
	unseen: number;
}
