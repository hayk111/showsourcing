import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';


@Injectable()
export class ProjectService {

	constructor(private http: HttpClient) {
	}

	load(id, maxCounter) {
		return this.http.get(`api/team/${id}/project?counter=${maxCounter}`).pipe(
			map((t: any) => t.elements)
		);
	}
}
