import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RequestElement, RequestReply } from '~core/models';

@Component({
	selector: 'request-element-form-app',
	templateUrl: './request-element-form.component.html',
	styleUrls: ['./request-element-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementFormComponent implements OnInit {

	@Input() requestElement: RequestElement;

	constructor() { }

	ngOnInit() {
	}

	updateRequest(request: RequestElement) {

	}

	updateReply(replyR: RequestReply) {
		// if (this.requestElement && this.requestElement.reply) {
		// 	this.updateRequest({
		// 		reply: { id: this.requestElement.reply.id, ...replyR }, ...this.requestElement
		// 	});
		// }
	}

}
