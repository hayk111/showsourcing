import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first, switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AttachmentService, UserService } from '~core/erm';
import { SelectParams } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { Attachment, ERM } from '~core/erm';
import { DialogService } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		UploaderFeedbackService
	]
})
export class FilesPageComponent extends AutoUnsub implements OnInit {

	@ViewChild('inpFile', { static: true }) inpFile: ElementRef<HTMLInputElement>;

	// this is used by upload service, so it can link to the product
	linkedEntity: any;
	erm = ERM;

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected dlgSrv: DialogService,
		protected attachmentSrv: AttachmentService,
		private uploadFeedback: UploaderFeedbackService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Attachment, AttachmentService>,
		public translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.linkedEntity = { id, __typename: 'Product' };
		this.uploadFeedback.init({ linkedEntity: this.linkedEntity });
		this.listSrv.setup({
			entitySrv: this.attachmentSrv,
			searchedFields: ['name'],
			selectParams: new SelectParams({
				query: `@links.Product.attachments.id == "${id}" && deleted == false`,
				sortBy: 'fileName'
			}),
			entityMetadata: ERM.ATTACHMENT,
			originComponentDestroy$: this._destroy$
		});

		this.listSrv.items$.pipe(first()).subscribe(files => this.uploadFeedback.setFiles(files));
	}

	addFile(files: Array<File>) {
		this.uploadFeedback.addFiles(files)
			.pipe(switchMap(_ => this.listSrv.refetch()))
			.subscribe();
	}

	download(attachment: Attachment) {
		saveAs(attachment.url, attachment.fileName);
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
