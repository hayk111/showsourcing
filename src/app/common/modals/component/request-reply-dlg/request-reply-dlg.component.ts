import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
		private cd: ChangeDetectorRef,
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

	next() {
		this.selectedIndex = (this.selectedIndex + 1) % (this.elements.length - 1);
		this.setElement();
	}

	back() {
		this.selectedIndex = this.selectedIndex - 1 >= 0 ? this.selectedIndex - 1 : this.elements.length - 1;
		this.setElement();
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
		const reply = { id: this.reply.id, status: this.doneStatus, __typename: 'RequestReply' };
		this.replySrv.update(reply).subscribe();
		this.dlgSrv.close({ type: CloseEventType.OK });
	}

	saveAndNext() {
		const reply = { id: this.reply.id, status: this.doneStatus, __typename: 'RequestReply' };
		this.replySrv.update(reply).subscribe();
		this.selectedIndex = this.getNextUnrepliedIndex();
		this.setElement();
	}

	private getNextUnrepliedIndex() {
		return this.elements.findIndex(elem => elem.reply.status !== this.doneStatus);
	}

	hasNext() {
		return this.elements.some(elem => elem.reply.status !== this.doneStatus);
	}

	update(fields: ExtendedField[]) {
		const reply = { id: this.reply.id, fields, message: 'reply', __typename: 'RequestReply' };
		this.replySrv.update(reply).subscribe();
	}

	addImage(files: File[]) {
		this.uploaderFeedback.addImages(files);
	}

	addAttachment() {

	}

}


