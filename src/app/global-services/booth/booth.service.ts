import { Injectable } from '@angular/core';
import { Booth } from '~models/booth.model';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { BoothQueries } from '~global-services/booth/booth.queries';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new BoothQueries, 'Booth');
	}

}
