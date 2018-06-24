import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Tag } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface, GlobalService } from '../_global/global.service';

import { TagQueries } from './tag.queries';


@Injectable({
	providedIn: 'root'
})
export class TagService extends GlobalService<Tag> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new TagQueries(), 'Tag');
	}

}
