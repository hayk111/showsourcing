import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
	providers: [
		ListHelper2Service,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class FilesPageComponent implements OnInit {

	constructor(
		protected route: ActivatedRoute,
		protected listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<any>
	) {
	}

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		// this.listHelper.setup('Attachment', 'Supplier', supplierId);
	}

	addToProject(event) {
		this.dialogCommonSrv.openSelectionDlg('Project', [event]);
		// TODO add the logic after closing dialog
	}

}
