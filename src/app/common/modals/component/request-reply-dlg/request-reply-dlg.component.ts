import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestReplyService } from '~core/entity-services';
import {
	AppImage,
	DEFAULT_REPLIED_STATUS,
	ExtendedField,
	ExtendedFieldDefinition,
	RequestElement,
	RequestReply,
	SupplierRequest,
} from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';

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
	@Input() request$: Observable<SupplierRequest>;
	element: RequestElement;
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];
	defaultStatus = DEFAULT_REPLIED_STATUS;

	constructor(
		private replySrv: RequestReplyService,
		private dlgSrv: DialogService,
		private uploaderFeedback: UploaderFeedbackService
	) { }

	ngOnInit() {
		this.setElement();
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

	private setElement() {
		this.element = this.elements[this.selectedIndex];

		if (!this.element) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.elements.toString()}`);
		}

		this.reply = this.element.reply;
		this.fields = this.reply.fields;
		this.definitions = this.reply.fields.map(field => field.definition);
		this.uploaderFeedback.init({ linkedEntity: this.reply });
		this.uploaderFeedback.setImages(this.reply.images);
		this.uploaderFeedback.setFiles(this.reply.attachments);
	}

	save(updateStatus = false) {
		const reply = updateStatus ?
			({ id: this.reply.id, fields: this.fields, status: this.defaultStatus, __typename: 'RequestReply' }) :
			({ id: this.reply.id, fields: this.fields, __typename: 'RequestReply' });
		this.replySrv.update(reply).subscribe();
		// we have to update it locally, since this is a modal and we don't get the updated object form the input when an update is performed
		this.reply = ({ ...this.reply, ...reply });
	}

	saveAndClose() {
		this.save();
		this.dlgSrv.close({ type: CloseEventType.OK });
	}

	saveAndNext() {
		this.save(true);
		// we have to update it locally, since this is a modal and we don't get the updated object form the input when an update is performed
		let tempElem = this.elements[this.selectedIndex];
		tempElem = ({ ...tempElem, reply: this.reply });
		this.elements[this.selectedIndex] = tempElem;
		this.selectedIndex = this.getNextUnrepliedIndex();
		this.setElement();
	}

	private getNextUnrepliedIndex() {
		return this.elements.findIndex(elem => elem.reply.status !== this.defaultStatus);
	}

	hasNext() {
		return this.elements.some(elem => elem.reply.status !== this.defaultStatus && elem.reply.id !== this.reply.id);
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

}


