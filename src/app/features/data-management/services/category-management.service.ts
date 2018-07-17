import { Injectable } from '@angular/core';
import { CategoryService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

@Injectable({
	providedIn: 'root'
})
export class CategoryManagementService extends CategoryService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}
}
