import { Injectable } from '@angular/core';
import { TagService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

@Injectable({
	providedIn: 'root'
})
export class TagManagememtService extends TagService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}
}
