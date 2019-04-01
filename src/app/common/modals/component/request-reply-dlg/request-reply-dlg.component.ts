import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestElement, ExtendedField, ExtendedFieldDefinition, RequestReply } from '~core/models';
import { RequestReplyService } from '~core/entity-services';
import { request } from 'http';

@Component({
	selector: 'request-reply-dlg-app',
	templateUrl: './request-reply-dlg.component.html',
	styleUrls: ['./request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestReplyDlgComponent {
	@Input() set element(elem: RequestElement) {
		this.reply = elem.reply;
		this.fields = this.reply.fields;
		this.definitions = this.reply.fields.map(field => field.definition);
	}
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];

	constructor(private replySrv: RequestReplyService) { }

	save(fields: ExtendedField[]) {
		const reply = { id: this.reply.id, fields, status: 'done', message: 'reply' };
		this.replySrv.update(reply);
	}

}
