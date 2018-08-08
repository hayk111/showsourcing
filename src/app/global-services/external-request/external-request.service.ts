import { Injectable } from '@angular/core';
import { ExternalRequest } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ExternalRequestQueries } from '~global-services/external-request/external-request.queries';
import { share, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';


@Injectable({
	providedIn: 'root'
})
export class ExternalRequestService extends GlobalService<ExternalRequest> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ExternalRequestQueries(), 'ExternalRequest');
	}


}

