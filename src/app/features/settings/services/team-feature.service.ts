import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { Invitation } from '~models';

import { TeamService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { Apollo } from 'apollo-angular';
import { LocalStorageService } from '~shared/local-storage';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';

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
