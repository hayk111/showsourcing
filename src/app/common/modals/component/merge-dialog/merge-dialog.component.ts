import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudDialogService } from '~common/modals/services/crud-dialog.service';
import { ERM, EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, translate } from '~utils';

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
		private notifSrv: NotificationService) {
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
				this.notifSrv.add({
					type: NotificationType.ERROR,
					title: 'Error',
					message: 'There is an error, please try again later',
					timeout: 3500
				});
				return;
			}

			this.notifSrv.add({
				type: NotificationType.SUCCESS,
				title: translate(this.capitalize(this.type.plural) + ' merged'),
				message: translate(`Selected ${this.type.plural} were merged into ${this.selected.name}`),
				timeout: 3500
			});
		});
	}

	private capitalize(txt: string): string {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	}
}
