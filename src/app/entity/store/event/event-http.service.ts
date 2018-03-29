import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '~app/features/user/services';
import { ERM } from '~entity/store/entity.model';
import { EntityService } from '~entity/store/entity.service';

@Injectable()
export class EventHttpService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv
			.load({ base: ERM.teams, target: ERM.event, recurring: true })
			.pipe(map((r: any) => r.elements));
	}
}
