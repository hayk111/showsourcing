import { Injectable } from '@angular/core';
import { Show } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ShowQueries } from '~global-services/show/show.queries';
import { GLOBAL_DATA_CLIENT } from '~shared/apollo/services/apollo-client-names.const';

@Injectable({ providedIn: 'root' })
export class ShowService extends GlobalService<Show> {

	defaultClient = GLOBAL_DATA_CLIENT;

	constructor(protected apollo: Apollo) {
		super(apollo, ShowQueries, 'show', 'shows');
	}

}
