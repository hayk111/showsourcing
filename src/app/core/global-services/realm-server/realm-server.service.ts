import { Injectable } from '@angular/core';
import { RealmServer } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { RealmServerQueries } from '~global-services/realm-server/realm-server.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class RealmServerService extends GlobalService<RealmServer> {
	defaultClient = Client.GLOBAL_CONSTANT;

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, RealmServerQueries, 'realmServer', 'realmServers');
	}

}
