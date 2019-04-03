import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RequestReplyService } from '~core/entity-services';
import { ExtendedField, ExtendedFieldDefinition, RequestElement, RequestReply } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-view.service';

@Component({
	selector: 'request-reply-dlg-app',
	templateUrl: './request-reply-dlg.component.html',
	styleUrls: ['./request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class RequestReplyDlgComponent implements OnInit {

	@Input() elements: RequestElement[] = [];
	@Input() selectedIndex = 0;
	element: RequestElement;
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];
	private doneStatus = 'done';

	constructor(
		private replySrv: RequestReplyService,
		private dlgSrv: DialogService,
		private uploaderFeedback: UploaderFeedbackService
	) { }

	ngOnInit() {
		this.setElement();
		this.uploaderFeedback.init({ linkedEntity: this.reply });
		this.uploaderFeedback.setImages(this.reply.images);
		this.uploaderFeedback.setFiles(this.reply.attachments);
	}


	get images() {
		return this.uploaderFeedback.getImages();
	}

	get files() {
		return this.uploaderFeedback.getFiles();
	}

	private setElement() {
		this.element = this.elements[this.selectedIndex];

		if (!this.element) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.elements.toString()}`);
		}

		this.reply = this.element.reply;
		this.fields = this.reply.fields;
		this.definitions = this.reply.fields.map(field => field.definition);
	}

	save() {
		const reply = { id: this.reply.id, fields: this.fields, status: this.doneStatus, __typename: 'RequestReply' };
		this.replySrv.update(reply).subscribe();
		// we have to update it locally, since this is a modal and we don't get the updated object form the input when an update is performed
		this.reply = ({ ...this.reply, status: this.doneStatus });
	}

	saveAndClose() {
		this.save();
		this.dlgSrv.close({ type: CloseEventType.OK });
	}

	saveAndNext() {
		this.save();
		// we have to update it locally, since this is a modal and we don't get the updated object form the input when an update is performed
		let tempElem = this.elements[this.selectedIndex];
		tempElem = ({ ...tempElem, reply: this.reply });
		this.elements[this.selectedIndex] = tempElem;
		this.selectedIndex = this.getNextIndex();
		this.setElement();
	}

	private getNextIndex() {
		return this.elements.findIndex(elem => elem.reply.status !== this.doneStatus);
	}

	hasNext() {
		return this.elements.some(elem => elem.reply.status !== this.doneStatus);
	}

	update(fields: ExtendedField[]) {
		const reply = { id: this.reply.id, fields, message: 'reply', __typename: 'RequestReply' };
		// this.update$ = this.replySrv.update(reply);
	}

	addImage(files: File[]) {
		this.uploaderFeedback.addImages(files);
	}

	addAttachment() {

	}

	hasEmptyField() {
		return this.fields.some(field => !field.value);
	}

}


