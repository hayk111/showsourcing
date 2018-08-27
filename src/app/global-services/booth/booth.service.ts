import { Injectable } from '@angular/core';
import { Booth } from '~models/booth.model';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { BoothQueries } from '~global-services/booth/booth.queries';
import { QueryBuilder } from '~global-services/_global/query-builder.class';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(protected apollo: Apollo) {
		super(apollo, BoothQueries, 'booth', 'booths');
	}

}
