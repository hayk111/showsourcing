import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { TemplateField } from '~core/ORM/models';

import { GlobalService } from '../_global/global.service';
import { TemplateFieldQueries } from './template-field.queries';


@Injectable({
	providedIn: 'root'
})
export class TemplateFieldService extends GlobalService<TemplateField> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, TemplateFieldQueries, 'templateField', 'templateFields');
	}

}
