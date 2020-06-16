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
import { ListFuseHelperService, SelectionService, ListHelperService } from '~core/list-page2';
import { ApiLibService } from '~core/api-lib';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListFuseHelperService,
		SelectionService,
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
		private uploadFeedback: UploaderFeedbackService,
		public dialogCommonSrv: DialogCommonService,
		public listHelper: ListFuseHelperService,
		public apiLibSrv: ApiLibService,
		public selectionSrv: SelectionService,
		public translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const productId = this.route.parent.snapshot.params.id;
		this.listHelper.setup('Attachment', 'Product', productId);
	}

	addFile(files: Array<File>) {
		// this.uploadFeedback.addFiles(files)
		// 	.pipe(switchMap(_ => this.listSrv.refetch()))
		// 	.subscribe();
	}

	download(attachment: Attachment) {
		saveAs(attachment.url, attachment.fileName);
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
