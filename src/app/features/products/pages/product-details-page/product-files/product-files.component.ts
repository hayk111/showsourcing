import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { AttachmentService, UserService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { Attachment, ERM } from '~core/models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'product-files-app',
	templateUrl: './product-files.component.html',
	styleUrls: ['./product-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFilesComponent extends AutoUnsub implements OnInit {

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected dlgSrv: DialogService,
		protected attachmentSrv: AttachmentService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Attachment, AttachmentService>
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.listSrv.setup({
			entitySrv: this.attachmentSrv,
			searchedFields: ['name'],
			selectParams: new SelectParams({
				query: `deleted == false && @links.Product.attachments.id == "${id}"`
			}),
			entityMetadata: ERM.ATTACHMENT,
			originComponentDestroy$: this._destroy$
		});
	}

}
