import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { RealmServerQueries } from '~entity-services/realm-server/realm-server.queries';
import { UserService } from '~entity-services/user/user.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { RealmServer } from '~models';



@Injectable({
	providedIn: 'root'
})
export class RealmServerService extends GlobalService<RealmServer> {
	defaultClient = Client.GLOBAL_CONSTANT;

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, RealmServerQueries, 'realmServer', 'realmServers');
	}

}
