import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EntityService, ERM } from '~entity';
import { UserService } from '~app/features/user';

@Injectable()
export class EventHttpService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv
			.load({ base: ERM.teams, target: ERM.events, recurring: true })
			.pipe(map((r: any) => r.elements));
	}
}
