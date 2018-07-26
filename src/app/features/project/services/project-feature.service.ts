import { Injectable } from '@angular/core';
import { ProjectService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class ProjectFeatureService extends ProjectService {
	constructor(
		protected wrapper: ApolloWrapper
	) {
		super(wrapper);
	}

}
