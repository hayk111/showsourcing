import { Injectable } from '@angular/core';
import { ProjectService, ProductService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';
import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectFeatureService extends ProjectService {
	constructor(
		protected wrapper: ApolloWrapper,
		protected productSrv: ProductService
	) {
		super(wrapper);
	}

}
