import { Injectable } from '@angular/core';
import { Show } from '~core/erm/models';

import { GlobalService } from '~core/erm/services/_global/global.service';
import { ShowQueries } from '~core/erm/services/show/show.queries';



@Injectable({ providedIn: 'root' })
export class ShowService extends GlobalService<Show> {

	constructor() {
		super(ShowQueries, 'show', 'shows');
	}

}
