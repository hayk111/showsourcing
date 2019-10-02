import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudDialogService } from '~common/modals/services/crud-dialog.service';
import { ERM, EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
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
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService) {
		super();
	}

	entitySelect(entity: any) {
		this.selected = entity;
	}

	onSubmit() {
		this.pending = true;
		this.crudDlgSrv.merge(this.selected, this.type, this.entities).subscribe(data => {
			console.log('TCL: MergeDialogComponent -> onSubmit -> data', data);
		});
		// .pipe(takeUntil(this._destroy$))
		// .subscribe(() => {
		// 	this.pending = false;
		// 	this.dlgSrv.close();
		// });
	}
}
