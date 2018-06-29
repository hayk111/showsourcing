import { Injectable } from '@angular/core';
import { CategoryService } from '~global-services';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class CategoryManagementService extends CategoryService {

	constructor(protected apollo: ApolloClient) {
		super(apollo);
	}
}
