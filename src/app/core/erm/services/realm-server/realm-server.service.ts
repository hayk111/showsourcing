import { Injectable } from '@angular/core';
import { RealmServer } from '~core/erm/models';
import { RealmServerQueries } from '~core/erm/services/realm-server/realm-server.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalService } from '~core/erm/services/_global/global.service';



@Injectable({
	providedIn: 'root'
})
export class RealmServerService extends GlobalService<RealmServer> {

	constructor(protected userSrv: UserService) {
		super(RealmServerQueries, 'realmServer', 'realmServers');
	}

}
