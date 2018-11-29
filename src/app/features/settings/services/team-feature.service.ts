import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { LocalStorageService } from '~core/local-storage';
import { TeamService } from '~entity-services';

@Injectable({
	providedIn: 'root'
})
export class TeamFeatureService extends TeamService {

	constructor(
		protected apolloState: ApolloStateService,
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService) {

		super(apolloState, storage, authSrv);
	}

}
