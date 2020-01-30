import { Injectable } from '@angular/core';
import { ExtendedFieldDefinition } from '~core/erm/models';
import { GlobalService } from '../_global/global.service';
import { ExtendedFieldDefinitionQueries } from './extended-field-definition.queries';



@Injectable({
	providedIn: 'root'
})
export class ExtendedFieldDefinitionService extends GlobalService<ExtendedFieldDefinition> {

	constructor() {
		super(ExtendedFieldDefinitionQueries, 'extendedFieldDefinition', 'extendedFieldDefinitions');
	}

}
