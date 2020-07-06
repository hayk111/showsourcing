import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Attachment, ERM, UserService } from '~core/erm';
import { ListHelper2Service, SelectionService } from '~core/list-page2';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { api } from 'lib';
import { UploaderService } from '~shared/file/services/uploader.service';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelper2Service,
		SelectionService,
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
		private uploaderSrv: UploaderService,
		public dialogCommonSrv: DialogCommonService,
		public listHelper: ListHelper2Service,
		public selectionSrv: SelectionService,
		public translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const productId = this.route.parent.snapshot.params.id;
		this.listHelper.setup(
			'Attachment',
			this._destroy$,
			(options) => api.Attachment.findByNodeId(`Product:${productId}`)
		);
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
