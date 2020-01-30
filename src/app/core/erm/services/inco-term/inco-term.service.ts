import { Injectable } from '@angular/core';
import { IncoTerm } from '~core/erm/models';
import { GlobalService } from '../_global/global.service';
import { IncoTermQueries } from './inco-term.queries';


@Injectable({
	providedIn: 'root'
})
export class IncoTermService extends GlobalService<IncoTerm> {

	constructor() {
		super(IncoTermQueries, 'incoterm', 'incoterms');
	}

}
