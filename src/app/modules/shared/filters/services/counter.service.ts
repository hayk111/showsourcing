import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { User } from '../../../store/model/user.model';
import { EntityRepresentation } from '../../../store/model/filter.model';

@Injectable()
export class CounterService {
	teamId: string;

	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select('user').subscribe((user: User) => {
			this.teamId = user.currentTeamId;
		});
	}

	getCount(entityName: EntityRepresentation) {
		return this.http.get(`/api/team/${this.teamId}/countProdsBy${entityName}`);
	}

}
