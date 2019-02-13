import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { SampleStatus } from '~models';

import { GlobalWithDeleteService } from '../_global/global-with-delete.service';
import { SampleStatusQueries } from './sample-status.queries';

@Injectable({
	providedIn: 'root'
})
export class SampleStatusService extends GlobalWithDeleteService<SampleStatus> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SampleStatusQueries, 'sampleStatus', 'sampleStatuses');
	}
}
