import { Injectable } from '@angular/core';
import { ExtendedField } from '~core/erm/models';
import { GlobalService } from '../_global/global.service';
import { ExtendedFieldQueries } from './extended-field.queries';



@Injectable({
	providedIn: 'root'
})
export class ExtendedFieldService extends GlobalService<ExtendedField> {

	constructor() {
		super(ExtendedFieldQueries, 'extendedField', 'extendedFields');
	}

}
