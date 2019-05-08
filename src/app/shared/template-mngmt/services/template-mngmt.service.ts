import { Injectable } from '@angular/core';
import { RequestTemplate } from '~core/models';
import { RequestTemplateService } from '~core/entity-services';
import { ExtendedFieldDefinitionService } from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TemplateMngmtService {

	constructor(
		private templateSrv: RequestTemplateService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) { }

	getTemplates() {
		return this.templateSrv.queryAll();
	}

	createNewTemplate(template: RequestTemplate) {
		return this.templateSrv.create(template);
	}

	getExtendedFields(template: RequestTemplate) {
		return this.extendedFieldDefSrv.queryMany({ query: 'target contains[c] "product."' }).pipe(
			map(fields => fields.map(field => {
				const isFound = !!template.requestedFields.find(f => f.target === field.target);
				return { field, checked: isFound };
			})),
		);
	}

	deleteTemplate(template: RequestTemplate) {
		return this.templateSrv.delete(template.id);
	}

	updateTemplate(template: RequestTemplate) {
		return this.templateSrv.update(template);
	}
}
