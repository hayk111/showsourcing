import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { AttachmentService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Attachment, ERM, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
})
export class FilesPageComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;
	erm = ERM;


	constructor(
		protected route: ActivatedRoute,
		protected dlgSrv: DialogService,
		protected attachmentSrv: AttachmentService,
		public commonModalSrv: CommonModalService,
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
