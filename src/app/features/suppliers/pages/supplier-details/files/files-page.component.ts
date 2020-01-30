import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AttachmentService } from '~core/ORM/services';
import { ListPageService } from '~core/list-page';
import { Attachment, ERM, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
	providers: [ListPageService],
	host: {
		class: 'table-page'
	}
})
export class FilesPageComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;
	erm = ERM;


	constructor(
		protected route: ActivatedRoute,
		protected dlgSrv: DialogService,
		protected attachmentSrv: AttachmentService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Attachment, AttachmentService>
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.supplier = { id, __typename: 'Supplier' };
		this.listSrv.setup({
			entitySrv: this.attachmentSrv,
			searchedFields: ['name'],
			selectParams: {
				query: `@links.Supplier.attachments.id == "${id}"`,
				sortBy: 'fileName'
			},
			entityMetadata: ERM.ATTACHMENT,
			originComponentDestroy$: this._destroy$
		});
	}

}
