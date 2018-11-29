import { Injectable } from '@angular/core';
import { RealmServer } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~entity-services/_global/global.service';
import { RealmServerQueries } from '~entity-services/realm-server/realm-server.queries';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
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
