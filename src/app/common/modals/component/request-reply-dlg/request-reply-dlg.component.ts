import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RequestReplyService } from '~core/entity-services';
import { ExtendedField, ExtendedFieldDefinition, RequestElement, RequestReply } from '~core/models';
import { DialogService, CloseEventType } from '~shared/dialog';

@Component({
	selector: 'request-reply-dlg-app',
	templateUrl: './request-reply-dlg.component.html',
	styleUrls: ['./request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestReplyDlgComponent {
	@Input() set element(elem: RequestElement) {
		this._element = elem;
		this.reply = elem.reply;
		this.fields = this.reply.fields;
		this.definitions = this.reply.fields.map(field => field.definition);
	}
	get element() {
		return this._element;
	}
	_element: RequestElement;
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];

	constructor(private replySrv: RequestReplyService, private dlgSrv: DialogService) { }

	save(wantNext = false) {
		const reply = { id: this.reply.id, status: 'done', __typename: 'RequestReply' };
		this.replySrv.update(reply).subscribe();
		this.dlgSrv.close({ type: CloseEventType.OK, data: { wantNext } });
	}

	update(fields: ExtendedField[]) {
		const reply = { id: this.reply.id, fields, message: 'reply', __typename: 'RequestReply' };
		this.replySrv.update(reply).subscribe();
	}

}


