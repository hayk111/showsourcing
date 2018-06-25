import { ProjectService } from '~global-services';
import { Injectable } from '@angular/core';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class ProjectFeatureService extends ProjectService {
	constructor(protected apollo: ApolloClient) {
		super(apollo);
	}
}
