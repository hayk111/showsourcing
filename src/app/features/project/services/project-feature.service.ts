import { ProjectService } from '~global-services';
import { Injectable } from '@angular/core';
import { ApolloWrapper } from '~shared/apollo';
import { Observable } from 'subscriptions-transport-ws';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProjectFeatureService extends ProjectService {
	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}

}
