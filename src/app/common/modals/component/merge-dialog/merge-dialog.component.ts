import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudDialogService } from '~common/modals/services/crud-dialog.service';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'merge-dialog-app',
	templateUrl: './merge-dialog.component.html',
	styleUrls: ['./merge-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergeDialogComponent extends AutoUnsub implements AfterViewInit {

	group: FormGroup;
	pending = false;
	@Input() type: EntityMetadata;
	@Input() entities: Array<any>;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService) {
		super();
		this.group = this.fb.group({
			name: ['', Validators.required],
		});
	}

	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}


	onSubmit() {
		if (this.group.valid) {
			this.pending = true;
			this.crudDlgSrv.merge(this.group, this.type, this.entities);
			// .pipe(takeUntil(this._destroy$))
			// .subscribe(() => {
			// 	this.pending = false;
			// 	this.dlgSrv.close();
			// });
		}
	}
}
