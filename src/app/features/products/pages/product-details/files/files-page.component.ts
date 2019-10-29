import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AttachmentService, UserService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { Attachment, ERM } from '~core/models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesPageComponent extends AutoUnsub implements OnInit {
	// this is used by upload service, so it can link to the product
	linkedEntity: any;
	erm = ERM;

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected dlgSrv: DialogService,
		protected attachmentSrv: AttachmentService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Attachment, AttachmentService>
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.linkedEntity = { id, __typename: 'Product' };
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
	}

}
