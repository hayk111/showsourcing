import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestReplyService, SupplierRequestService } from '~core/entity-services';
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
import { AutoUnsub } from '~utils/auto-unsub.component';

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
	request$: Observable<SupplierRequest>;
	request: SupplierRequest;
	elements: RequestElement[] = [];
	element: RequestElement;
	reply: RequestReply;
	fields: ExtendedField[];
	definitions: ExtendedFieldDefinition[];
	defaultStatus = DEFAULT_REPLIED_STATUS;

	constructor(
		private replySrv: RequestReplyService,
		private requestSrv: SupplierRequestService,
		private dlgSrv: DialogService,
		private uploaderFeedback: UploaderFeedbackService,
	) {
		super();
	}

	ngOnInit() {
		this.request$ = this.requestSrv.selectOne(this.requestId);
		this.request$.pipe(
			tap(request => this.request = request),
		).subscribe(_ => this.setElement());
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
		this.elements = this.request.requestElements;
		this.element = this.elements[this.selectedIndex];

		if (!this.element) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.elements.toString()}`);
		}

		this.reply = this.element.reply;
		this.fields = this.reply.fields;
		this.definitions = this.reply.fields.map(field => field.definition);
		this.uploaderFeedback.init({ linkedEntity: this.reply });
		this.uploaderFeedback.setImages(this.reply.images.filter(img => !img.deleted));
		this.uploaderFeedback.setFiles(this.reply.attachments);
	}

	save(updateStatus = false) {
		const reply = updateStatus ?
			({ id: this.reply.id, fields: this.fields, status: this.defaultStatus, __typename: 'RequestReply' }) :
			({ id: this.reply.id, fields: this.fields, __typename: 'RequestReply' });
		this.replySrv.update(reply).subscribe();
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


