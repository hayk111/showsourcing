import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EntityService } from '~entity';
import { UserService } from '~user';


@Injectable()
export class EventService {

	constructor(private entitySrv: EntityService, private userSrv: UserService) {
	}

	load() {
		return this.entitySrv.load({ url: `api/team/${this.userSrv.teamId}/event`, recurring: true }).pipe(
			map((r: any) => r.elements)
		);
	}
}
