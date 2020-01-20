import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CrudDialogService } from '~common/dialogs/services/crud-dialog.service';
import { EntityMetadata, ERM } from '~models';
import { DialogService } from '~shared/dialog/services';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'merge-dialog-app',
	templateUrl: './merge-dialog.component.html',
	styleUrls: ['./merge-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergeDialogComponent extends AutoUnsub {

	selected: any;
	erm: ERM;
	pending = false;
	@Input() type: EntityMetadata;
	@Input() entities: Array<any>;

	constructor(
		public dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService,
		private toastSrv: ToastService,
		private translate: TranslateService
	) {
		super();
	}

	entitySelect(entity: any) {
		this.selected = entity;
	}

	onSubmit() {
		this.pending = true;
		this.crudDlgSrv.merge(this.selected, this.type, this.entities).subscribe(data => {
			this.dlgSrv.close();
			this.pending = false;

			if (data.status === 'error') {
				this.toastSrv.add({
					type: ToastType.ERROR,
					title: 'title.error',
					message: 'message.there-is-an-error',
					timeout: 3500
				});
				return;
			}

			this.toastSrv.add({
				type: ToastType.SUCCESS,
				title: this.translate.instant('OBJ.OBJ-merged', { field: this.capitalize(this.type.plural) }),
				message: this.translate.instant('OBJ.selected-OBJ-merged-into-OBJ', { field: this.type.plural, name: this.selected.name }),
				timeout: 3500
			});
		});
	}

	private capitalize(txt: string): string {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	}
}
