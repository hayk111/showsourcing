import { Injectable } from '@angular/core';
import { map, switchMap, first } from 'rxjs/operators';
import { RequestTemplateService } from '~core/entity-services';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition, RequestTemplate, TemplateField } from '~core/models';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { Observable } from 'rxjs';


export interface InTemplateField extends TemplateField {
	inTemplate: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class TemplateMngmtService {

	private listQuery: ListQuery<RequestTemplate>;

	constructor(
		private templateSrv: RequestTemplateService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
		this.listQuery = this.templateSrv.getListQuery({ take: 1000, sortBy: '' });
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
	 * return an array of TemplateField. Made of all the extendedFields.
	 * So we can display existing templateFields from the RequestTemplate, but also the ones
	 * that aren't selectioned yet inside it
	 */
	getTemplateFields(existings: TemplateField[]): Observable<InTemplateField[]> {
		const findTempField = (def: ExtendedFieldDefinition) => existings.find(field => field.definition.id === def.id);

		return this.extendedFieldDefSrv
			.queryMany({ query: 'target contains[c] "product." OR target == "Product"', sortBy: 'order', descending: false })
			.pipe(
				map(defs => defs.map(definition => {
					const field = findTempField(definition);
					if (field)
						return { ...field, inTemplate: true };
					else
						return { ...(new TemplateField({ definition })), inTemplate: false };
				})),
				first()
			);
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
