import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier, Attachment, ERM } from '~models';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { DialogService } from '~shared/dialog';
import { AttachmentService } from '~core/entity-services';
import { CommonModalService } from '~common/modals';
import { ListPageService } from '~core/list-page';

@Component({
	selector: 'supplier-files-app',
	templateUrl: './supplier-files.component.html',
	styleUrls: ['./supplier-files.component.scss'],
})
export class SupplierFilesComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;

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
		this.listSrv.setup({
			entitySrv: this.attachmentSrv,
			searchedFields: ['name'],
			selectParams: new SelectParams({
				query: `deleted == false && @links.Supplier.attachments.id == "${id}"`
			}),
			entityMetadata: ERM.ATTACHMENT,
			originComponentDestroy$: this._destroy$
		});
	}

}
