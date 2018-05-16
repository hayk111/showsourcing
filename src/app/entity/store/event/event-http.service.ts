import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '~app/features/user/services';
import { ERM } from '~app/entity/store/entity.model';
import { EntityService } from '~app/entity/store/entity.service';

@Injectable()
export class EventHttpService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv
			.load({ base: ERM.team, target: ERM.event, recurring: true })
			.pipe(map((r: any) => r.elements));
	}
}
