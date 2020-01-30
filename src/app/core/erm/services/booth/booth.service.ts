import { Injectable } from '@angular/core';
import { Booth } from '~core/erm/models/booth.model';
import { BoothQueries } from '~core/erm/services/booth/booth.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';



@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor() {
		super(BoothQueries, 'booth', 'booths');
	}

}
