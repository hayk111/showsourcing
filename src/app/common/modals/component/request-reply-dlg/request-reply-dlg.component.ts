import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { RequestReplyService, SupplierRequestService } from '~core/entity-services';
import {
	AppImage,
	ExtendedField,
	ExtendedFieldDefinition,
	ReplyStatus,
	RequestElement,
	RequestReply,
	SupplierRequest,
} from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';

import { RefuseReplyDlgComponent } from '../refuse-reply-dlg/refuse-reply-dlg.component';
import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';

@Component({
	selector: 'request-reply-dlg-app',
	templateUrl: './request-reply-dlg.component.html',
	styleUrls: ['./request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class RequestReplyDlgComponent extends AutoUnsub implements OnInit {

	@Input() selectedIndex = 0;
	@Input() requestId: string;
	@Input() elements: RequestElement[] = [];

	@ViewChild('content', { static: false }) content: ElementRef;

	request$: Observable<SupplierRequest>;
	request: SupplierRequest;
	element: RequestElement;
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];
	descriptionCtrl = new FormControl('');


	constructor(
		private replySrv: RequestReplyService,
		private requestSrv: SupplierRequestService,
		private dlgSrv: DialogService,
		private uploaderFeedback: UploaderFeedbackService
	) {
		super();
	}

	ngOnInit() {
		this.request$ = this.requestSrv.selectOne(this.requestId);
		// first time we want to set the element, but the next calls we dont want to override the uploadfeedbackvlaues
		let initialCall = true;
		this.request$.pipe(
			tap(request => this.request = request),
			takeUntil(this._destroy$)
		).subscribe(_ => {
			this.setElement(initialCall);
			initialCall = false;
		});
		if (this.isDisabled())
			this.descriptionCtrl.disable();
	}


	get images() {
		return this.uploaderFeedback.getImages();
	}

	get files() {
		return this.uploaderFeedback.getFiles();
	}

	next() {
		this.selectedIndex = (this.selectedIndex + 1) % (this.elements.length);
		this.setElement();
	}

	back() {
		this.selectedIndex = this.selectedIndex - 1 >= 0 ? this.selectedIndex - 1 : this.elements.length - 1;
		this.setElement();
	}

	private setElement(initialCall = true) {
		this.element = this.elements[this.selectedIndex];

		if (!this.element) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.elements.toString()}`);
		}

		this.reply = this.element.reply;
		this.fields = this.reply.fields;
		this.definitions = this.reply.fields.map(field => field.definition);
		// first time we want to set the element, but the next calls we dont want to override the uploadfeedbackvlaues
		if (initialCall) {
			this.uploaderFeedback.init({ linkedEntity: this.reply });
			this.uploaderFeedback.setImages(this.reply.images.filter(img => !img.deleted));
			this.uploaderFeedback.setFiles(this.reply.attachments);
		}
	}

	save(updateStatus = false, lastItem = false) {
		const reply = updateStatus ?
			({
				id: this.reply.id,
				message: this.descriptionCtrl.value,
				fields: this.fields,
				status: ReplyStatus.REPLIED,
				__typename: 'RequestReply'
			}) :
			({
				id: this.reply.id,
				message: this.descriptionCtrl.value,
				fields: this.fields,
				__typename: 'RequestReply'
			});
		// since update is async we have to save the index before it changes
		const localSelectIndex = this.selectedIndex;
		this.replySrv.update(reply).subscribe(_ => {
			if (updateStatus && lastItem)
				this.dlgSrv.open(ReplySentDlgComponent);
			else if (updateStatus) {
				// since we are sending the elements as an Input, we have to manually set the status so it does not show as not replied
				this.elements[localSelectIndex].reply.status = ReplyStatus.REPLIED;
				this.descriptionCtrl.reset();
				this.content.nativeElement.scrollIntoView();
			}
		});
	}

	saveAndClose() {
		this.save();
		this.dlgSrv.close({ type: CloseEventType.OK });
	}

	saveAndNext() {
		this.save(true);
		this.selectedIndex = this.getNextUnrepliedIndex();
		this.setElement();
	}

	refuse() {
		setTimeout(_ => this.dlgSrv.open(RefuseReplyDlgComponent, {
			senderName: this.request.sender.name,
			recipientName: this.request.recipient.name,
			replyId: this.reply.id
		}), 100);
	}

	private getNextUnrepliedIndex() {
		// we map the elements that are still unreplied and we filter the undefined ones
		const unrepliedElements = this.elements.map(
			(elem, index) => {
				if ((
					elem.reply.status === ReplyStatus.PENDING ||
					elem.reply.status === ReplyStatus.ERROR ||
					elem.reply.status === ReplyStatus.RESENT
				) && elem.reply.id !== this.reply.id)
					return index;
			}).filter(index => index !== undefined);
		// we search for an element who's index is bigger than the current index
		const newIndex = unrepliedElements.find(index => index >= this.selectedIndex);
		// if we didn't find any element we just pick up the first one
		return newIndex ? newIndex : unrepliedElements.shift();
	}

	hasNext() {
		return this.elements.some(elem => (
			elem.reply.status === ReplyStatus.PENDING ||
			elem.reply.status === ReplyStatus.ERROR ||
			elem.reply.status === ReplyStatus.RESENT
		) && elem.reply.id !== this.reply.id);
	}

	addImage(files: File[]) {
		this.uploaderFeedback.addImages(files);
	}

	addAttachment(files: File[]) {
		this.uploaderFeedback.addFiles(files);
	}

	hasEmptyField() {
		return this.fields.some(field => !field.value);
	}

	deleteImg(img: AppImage) {
		this.uploaderFeedback.deleteImg(img);
	}

	getTooltipMessage() {
		switch (this.reply.status) {
			case ReplyStatus.PENDING:
				return this.hasEmptyField() ? translate('All fields must be filled first') : null;
			case ReplyStatus.ERROR:
				return translate('Something bad happened, please resubmit');
			case ReplyStatus.VALIDATED:
			case ReplyStatus.REPLIED:
				return translate('Your request has been already submitted');
			case ReplyStatus.REFUSED:
				return translate('You refused that request');
		}
	}

	// supplier can only reply when the status is pending, error o sentBack
	isDisabled() {
		return (
			this.reply.status !== ReplyStatus.PENDING &&
			this.reply.status !== ReplyStatus.ERROR &&
			this.reply.status !== ReplyStatus.RESENT
		);
	}

}


