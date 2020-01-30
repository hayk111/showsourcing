import { Injectable } from '@angular/core';

import { GlobalService } from '~core/erm/services/_global/global.service';
import { RequestTemplate } from '~core/erm/models';

import { RequestTemplateQueries } from './request-template.queries';


@Injectable({ providedIn: 'root' })
export class RequestTemplateService extends GlobalService<RequestTemplate> {

	constructor() {
		super(RequestTemplateQueries, 'requestTemplate', 'requestTemplates');
	}

}
