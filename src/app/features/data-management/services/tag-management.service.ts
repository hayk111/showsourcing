import { Injectable } from '@angular/core';
import { TagService } from '~global-services';
import { GqlClient } from '~shared/apollo';

@Injectable()
export class TagManagememtService extends TagService {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient);
	}
}
