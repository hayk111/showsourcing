import { Injectable } from '@angular/core';
import { TagService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class TagManagememtService extends TagService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}
}
