import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Invitation } from '~models';

import { InvitationService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class InvitationFeatureService extends InvitationService {

	constructor(protected apollo: ApolloClient, private invitationSrv: InvitationService) {
		super(apollo);
	}

}
