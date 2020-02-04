import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ExtendedFieldService, RequestReplyService, SupplierRequestService } from '~core/erm';
import {
	AppImage,
	ExtendedField,
	ExtendedFieldDefinition,
	ReplyStatus,
	RequestElement,
	RequestReply,
	SupplierRequest,
} from '~core/erm';
import { CloseEventType, DialogService } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { AutoUnsub } from '~utils/auto-unsub.component';

import { RefuseReplyDlgComponent } from '../refuse-reply-dlg/refuse-reply-dlg.component';
import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';
import { TranslateService } from '@ngx-translate/core';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';

@Component({
	selector: 'request-reply-dlg-app',
	templateUrl: './request-reply-dlg.component.html',
	styleUrls: ['./request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class RequestReplyDlgComponent extends AutoUnsub implements OnInit {
	formConfig = new DynamicFormConfig({ colAmount: 2 });
	@Input() selectedIndex = 0;
	@Input() requestId: string;

	@ViewChild('content', { static: false }) content: ElementRef;

	request$: Observable<SupplierRequest>;
	request: SupplierRequest;
	selectedElement: RequestElement;
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];
	descriptionCtrl = new FormControl('');
	// we save this localField the first initial load of the dialog, this way we store the first value of the fields
	// this way when the object gets updated, we won't have display issues between the new data that we receive from the
	// updated object and the object that we display
	/** fields used to display the current and latest information */
	localFields: ExtendedField[];
	/** indicates us if its the first time this dialog is rendered */
	initialLoad = true;


	constructor(
		private replySrv: RequestReplyService,
		private requestSrv: SupplierRequestService,
		private dlgSrv: DialogService,
		private uploaderFeedback: UploaderFeedbackService,
		private translate: TranslateService,
		private extendedFieldSrv: ExtendedFieldService
	) {
		super();
	}

	ngOnInit() {
		this.request$ = this.requestSrv.selectOne(this.requestId);
		this.request$.pipe(
			tap(request => {
				(request.requestElements || []).sort((a, b) => a.id.localeCompare(b.id));
				this.request = request;
			}),
			takeUntil(this._destroy$)
		).subscribe(_ => {
			this.setElement();
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
		this.selectedIndex = (this.selectedIndex + 1) % (this.request.requestElements.length);
		// since the dialog is not closed, we have to set the default value to initialLoad
		this.initialLoad = true;
		this.setElement();
	}

	back() {
		this.selectedIndex = this.selectedIndex - 1 >= 0 ? this.selectedIndex - 1 : this.request.requestElements.length - 1;
		// since the dialog is not closed, we have to set the default value to initialLoad
		this.initialLoad = true;
		this.setElement();
	}

	private setElement() {
		this.selectedElement = this.request.requestElements[this.selectedIndex];

		if (!this.selectedElement) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.selectedElement.toString()}`);
		}

		this.reply = this.selectedElement.reply;
		this.fields = this.reply.fields;
		if (this.initialLoad)
			this.localFields = [...this.reply.fields];
		this.initialLoad = false;
		this.definitions = this.reply.fields.map(field => field.definition);
		this.uploaderFeedback.setImages(this.reply.images);
		this.uploaderFeedback.setFiles(this.reply.attachments);
		this.uploaderFeedback.init({ linkedEntity: this.reply });
	}

	save(updateStatus = false, lastItem = false) {
		const reply = updateStatus ?
			({
				id: this.reply.id,
				message: this.descriptionCtrl.value,
				fields: this.localFields,
				status: ReplyStatus.REPLIED,
				__typename: 'RequestReply'
			}) :
			({
				id: this.reply.id,
				message: this.descriptionCtrl.value,
				fields: this.localFields,
				__typename: 'RequestReply'
			});

		// since update is async we have to save the index before it changes
		const localSelectIndex = this.selectedIndex;

		this.replySrv.update(reply).subscribe(_ => {
			if (updateStatus && lastItem)
				this.dlgSrv.open(ReplySentDlgComponent);
			else if (updateStatus) {
				// since we are sending the elements as an Input, we have to manually set the status so it does not show as not replied
				this.selectedElement[localSelectIndex].reply.status = ReplyStatus.REPLIED;
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
		// since the dialog is not closed, we have to set the default value to initialLoad
		this.initialLoad = true;
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
		const unrepliedElements = this.request.requestElements.map(
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
		return this.request.requestElements.some(elem => (
			elem.reply.status === ReplyStatus.PENDING ||
			elem.reply.status === ReplyStatus.ERROR ||
			elem.reply.status === ReplyStatus.RESENT
		) && elem.reply.id !== this.reply.id);
	}

	addImage(files: File[]) {
		this.uploaderFeedback.addImages(files).subscribe();
	}

	addAttachment(files: File[]) {
		this.uploaderFeedback.addFiles(files).subscribe();
	}

	hasEmptyField() {
		return this.fields.some(field => !field.value);
	}

	deleteImg(img: AppImage) {
		this.uploaderFeedback.deleteImg(img);
		this.uploaderFeedback.setImages(this.selectedElement.reply.images.filter(image => !image.deleted));
	}

	getTooltipMessage() {
		switch (this.reply.status) {
			case ReplyStatus.PENDING:
				return this.hasEmptyField() ? this.translate.instant('error.all-fields-must-filled') : null;
			case ReplyStatus.ERROR:
				return this.translate.instant('error.stmg-bad-happened-please-resubmit');
			case ReplyStatus.VALIDATED:
			case ReplyStatus.REPLIED:
				return this.translate.instant('error.your-request-already-submitted');
			case ReplyStatus.REFUSED:
				return this.translate.instant('error.you-refused-that-request');
		}
	}

	// supplier can only reply when the status is pending, error o sentBack
	isDisabled() {
		return (
			this.reply &&
			this.reply.status !== ReplyStatus.PENDING &&
			this.reply.status !== ReplyStatus.ERROR &&
			this.reply.status !== ReplyStatus.RESENT
		);
	}

	updateExtendedField(field: ExtendedField) {
		if (field && field.id)
			this.extendedFieldSrv.update(field, Client.GLOBAL_REQUEST).subscribe();
	}

}


