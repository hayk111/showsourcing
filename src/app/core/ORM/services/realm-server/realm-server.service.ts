import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { RealmServerQueries } from '~core/ORM/services/realm-server/realm-server.queries';
import { UserService } from '~core/ORM/services/user/user.service';
import { GlobalService } from '~core/ORM/services/_global/global.service';
import { RealmServer } from '~core/ORM/models';



@Injectable({
	providedIn: 'root'
})
export class RealmServerService extends GlobalService<RealmServer> {
	defaultClient = Client.GLOBAL_CONSTANT;

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, RealmServerQueries, 'realmServer', 'realmServers');
	}

}
