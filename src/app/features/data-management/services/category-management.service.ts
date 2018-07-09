import { Injectable } from '@angular/core';
import { CategoryService } from '~global-services';
import { GqlClient } from '~shared/apollo';

@Injectable()
export class CategoryManagementService extends CategoryService {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient);
	}
}
