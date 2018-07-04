import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { Invitation } from '~models';

import { InvitationService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloClient } from '~shared/apollo';
import { UserService } from '../../../global-services';

@Injectable()
export class InvitationFeatureService extends InvitationService {

	constructor(protected apollo: ApolloClient, private invitationSrv: InvitationService, private userSrv: UserService) {
		super(apollo);
	}

	getInviter() {
		return this.userSrv.user$.pipe(first());
	}
}
