import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { Invitation } from '~models';

import { TeamService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { LocalStorageService } from '~shared/local-storage';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';

@Injectable({
	providedIn: 'root'
})
export class TeamFeatureService extends TeamService {

	constructor(apollo: ApolloWrapper,
		apolloState: ApolloStateService,
		teamPickerSrv: TeamPickerService) {
		super(apollo, apolloState, teamPickerSrv);
	}

}
