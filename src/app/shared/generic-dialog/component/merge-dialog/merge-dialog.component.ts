import { ChangeDetectionStrategy, Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { EntityMetadata } from '~models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';
import { Router } from '@angular/router';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { CrudDialogService } from '~shared/generic-dialog/services';
import { takeUntil } from 'rxjs/operators';

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
