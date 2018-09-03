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
	updated_at: Date;
	verb: string;
}

export interface GetStreamActivity {
	actor: string;
	foreign_id: string;
	id: string;
	object: string;
	origin: string;
	target: string;
	time: Date;
	verb: string;
}
