import { Injectable } from '@angular/core';
import { ExternalRequestService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class ExternalRequestFeatureService extends ExternalRequestService {
	constructor(
		protected wrapper: ApolloWrapper
	) {
		super(wrapper);
	}

}
