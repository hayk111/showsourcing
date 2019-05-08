import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequestTemplateService } from '~core/entity-services';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition, RequestTemplate } from '~core/models';

@Injectable({
	providedIn: 'root'
})
export class TemplateMngmtService {

	constructor(
		private templateSrv: RequestTemplateService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
	}

	getTemplates() {
		// TODO don't use selectAll here, it will reset the form
		return this.templateSrv.selectAll();
	}

	createNewTemplate(template: RequestTemplate) {
		return this.templateSrv.create(template);
	}

	getExtendedFields(template: RequestTemplate) {
		return this.extendedFieldDefSrv.queryMany({ query: 'target contains[c] "product."' }).pipe(
			map(fields => fields.reduce((prev, curr) => {
				const isFound = !!template.requestedFields.find(f => f.id === curr.id);
				return prev.set(curr, isFound);
			}, new Map<ExtendedFieldDefinition, boolean>())),
		);
	}

	deleteTemplate(template: RequestTemplate) {
		return this.templateSrv.delete(template.id);
	}

	updateTemplate(template: RequestTemplate) {
		return this.templateSrv.update(template);
	}
}
