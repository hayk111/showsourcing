import { Injectable } from '@angular/core';
import { map, switchMap, first } from 'rxjs/operators';
import { RequestTemplateService } from '~core/ORM/services';
import {
	ExtendedFieldDefinitionService,
} from '~core/ORM/services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition, RequestTemplate, TemplateField } from '~core/ORM/models';
import { ListQuery } from '~core/ORM/services/_global/list-query.interface';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class TemplateMngmtService {

	private listQuery: ListQuery<RequestTemplate>;

	constructor(
		private templateSrv: RequestTemplateService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
		this.listQuery = this.templateSrv.getListQuery({ take: 0, sortBy: '' });
		this.listQuery.items$.connect();
	}

	getTemplates() {
		// we use list query here because the user can create templates
		// and we want to easily refetch
		return this.listQuery.items$;
	}

	createNewTemplate(template: RequestTemplate) {
		return this.templateSrv.create(template);
	}

	/**
	 * returns array of template field and a map that says whether or not they are in the template
	 */
	getTemplateFields(existings: TemplateField[]): Observable<{ allFields: TemplateField[], inTemplate: Map<string, boolean> }> {

		return this.extendedFieldDefSrv
			.queryMany({ query: 'target contains[c] "product." OR target == "Product"', sortBy: 'order', descending: false, take: 0 })
			.pipe(
				map(defs => this.mapDefinitions(defs, existings)),
				first()
			);
	}

	private mapDefinitions(definitions: ExtendedFieldDefinition[], existings: TemplateField[]) {
		const allFields = [];
		const inTemplate = new Map<string, boolean>();
		const findTempField = (def: ExtendedFieldDefinition) => existings.find(field => field.definition.id === def.id);
		definitions.forEach(definition => {
			const field = findTempField(definition);
			if (field) {
				allFields.push(field);
				inTemplate.set(field.id, true);
			} else {
				const newField = new TemplateField({ definition });
				allFields.push(newField);
				inTemplate.set(newField.id, false);
			}
		});

		return { allFields, inTemplate };
	}

	deleteTemplate(template: RequestTemplate) {
		return this.templateSrv.delete(template.id).pipe(
			switchMap(_ => this.listQuery.refetch({}))
		);
	}

	updateTemplate(template: RequestTemplate) {
		return this.templateSrv.update(template).pipe(
		);
	}

	getOne(id: string) {
		return this.templateSrv.queryOne(id);
	}

	refetch() {
		return this.listQuery.refetch({});
	}

}
