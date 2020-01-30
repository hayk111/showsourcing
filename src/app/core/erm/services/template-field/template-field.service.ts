import { Injectable } from '@angular/core';

import { TemplateField } from '~core/erm/models';

import { GlobalService } from '../_global/global.service';
import { TemplateFieldQueries } from './template-field.queries';


@Injectable({
	providedIn: 'root'
})
export class TemplateFieldService extends GlobalService<TemplateField> {

	constructor() {
		super(TemplateFieldQueries, 'templateField', 'templateFields');
	}

}
