import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { RequestTemplateService } from '~core/entity-services';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition, RequestTemplate } from '~core/models';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';

@Injectable({
	providedIn: 'root'
})
export class TemplateMngmtService {

	private listQuery: ListQuery<RequestTemplate>;

	constructor(
		private templateSrv: RequestTemplateService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
		this.listQuery = this.templateSrv.getListQuery({ take: 1000 });
		this.listQuery.items$.connect();
	}

	getTemplates() {
		// we use list query here because the user can create templates
		return this.listQuery.items$;
	}

	createNewTemplate(template: RequestTemplate) {
		return this.templateSrv.create(template);
	}

	getExtendedFields(template: RequestTemplate) {
		return this.extendedFieldDefSrv.queryMany({ query: 'target contains[c] "product."', sortBy: 'order', descending: false }).pipe(
			map(fields => fields.reduce((prev, curr) => {
				const isFound = template && !!template.requestedFields.find(f => f.id === curr.id);
				return prev.set(curr, isFound);
			}, new Map<ExtendedFieldDefinition, boolean>())),
		);
	}

	deleteTemplate(template: RequestTemplate) {
		return this.templateSrv.delete(template.id).pipe(
			switchMap(_ => this.listQuery.refetch({}))
		);
	}

	updateTemplate(template: RequestTemplate) {
		return this.templateSrv.update(template).pipe(
			switchMap(_ => this.listQuery.refetch({}))
		);
	}

	getOne(id: string) {
		return this.templateSrv.queryOne(id);
	}

	refetch() {
		return this.listQuery.refetch({});
	}
}
