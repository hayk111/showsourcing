import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/entities/user.selector';
import { User } from '../model/entities/user.model';
import { map } from 'rxjs/operators';


@Injectable()
export class EventService {

	constructor(private http: HttpClient) {
	}

	load(id, maxCounter) {
		return this.http.get(`api/team/${id}/event?counter=${maxCounter}`).pipe(
			map((r: any) => r.elements)
		);
	}
}
