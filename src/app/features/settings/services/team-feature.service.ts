import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { Invitation } from '~models';

import { TeamService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloClient } from '~shared/apollo';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { LocalStorageService } from '~shared/local-storage';

@Injectable()
export class TeamFeatureService extends TeamService {

	constructor(apollo: ApolloClient,
			apolloState: ApolloStateService,
			storage: LocalStorageService,
			router: Router,
			teamSrv: TeamService) {
		super(apollo, apolloState, storage, router);
	}

}
