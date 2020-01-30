import { Injectable } from '@angular/core';
import { RequestElement } from '~core/erm';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { RequestElementQueries } from './request-element.queries';



@Injectable({ providedIn: 'root' })
export class RequestElementService extends GlobalService<RequestElement> {

	constructor() {
		super(RequestElementQueries, 'requestElement', 'requestElements');
	}

}


