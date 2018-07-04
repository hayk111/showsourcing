import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { TeamUser } from '~models';

import { TeamUserService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class MemberFeatureService extends TeamUserService {

	constructor(protected apollo: ApolloClient, private teamUserSrv: TeamUserService) {
		super(apollo);
	}

}
