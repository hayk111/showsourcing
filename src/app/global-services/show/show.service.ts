import { Injectable } from '@angular/core';
import { Show } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ShowQueries } from '~global-services/show/show.queries';

@Injectable({ providedIn: 'root' })
export class ShowService extends GlobalService<Show> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ShowQueries(), 'Show');
	}

}
