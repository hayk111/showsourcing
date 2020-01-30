import { Injectable } from '@angular/core';

import { SampleStatus } from '~core/erm/models';

import { GlobalService } from '../_global/global.service';
import { SampleStatusQueries } from './sample-status.queries';

@Injectable({
	providedIn: 'root'
})
export class SampleStatusService extends GlobalService<SampleStatus> {

	constructor() {
		super(SampleStatusQueries, 'sampleStatus', 'sampleStatuses');
	}
}
