import { Injectable } from '@angular/core';
import { Harbour } from '~core/erm/models';
import { GlobalService } from '../_global/global.service';
import { HarbourQueries } from './harbour.queries';


@Injectable({
	providedIn: 'root'
})
export class HarbourService extends GlobalService<Harbour> {


	constructor() {
		super(HarbourQueries, 'harbour', 'harbours');
	}

}
