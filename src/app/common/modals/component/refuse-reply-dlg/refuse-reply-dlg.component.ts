import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { RequestReplyService } from '~core/entity-services';
import { ReplyStatus } from '~core/models';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';
import { ID } from '~utils';

@Component({
	selector: 'refuse-reply-dlg-app',
	templateUrl: './refuse-reply-dlg.component.html',
	styleUrls: ['./refuse-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefuseReplyDlgComponent implements OnInit {

	@Input() senderName = '';
	@Input() recipientName = '';
	@Input() replyId: ID;
	pending = false;
	message = '';

	@ViewChild(InputDirective) inp: InputDirective;

	constructor(
		private dlgSrv: DialogService,
		private requestReplySrv: RequestReplyService
	) { }

	ngOnInit() {
		// TODO i18n
		this.message =
			'Dear ' + this.senderName +
			',\n\nI think you send us the wrong request, we cannot help you with this one\n\n' +
			'Best regards,\n\n' +
			this.recipientName;
		this.inp.focus();
	}

	close() {
		this.dlgSrv.close();
	}

	refuse(message) {
		this.pending = true;
		this.requestReplySrv.update({ id: this.replyId, message, status: ReplyStatus.REFUSED })
			.subscribe(_ => {
				this.pending = false;
				this.close();
			});
	}

}
