import { Injectable } from '@angular/core';
import { CategoryService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class CategoryManagementService extends CategoryService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}
}
