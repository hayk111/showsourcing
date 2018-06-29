import { Injectable } from '@angular/core';
import { TagService } from '~global-services';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class TagManagememtService extends TagService {

	constructor(protected apollo: ApolloClient) {
		super(apollo);
	}
}
