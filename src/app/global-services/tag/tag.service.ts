import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Tag } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';

import { TagQueries } from '~global-services/tag/tag.queries';


@Injectable({
	providedIn: 'root'
})
export class TagService extends GlobalService<Tag> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new TagQueries(), 'Tag');
	}

}
