import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { CrudDialogService } from '~shared/generic-dialog/services/crud-dialog.service';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './creation-dialog.component.html',
	styleUrls: ['./creation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationDialogComponent extends AutoUnsub implements AfterViewInit {

	group: FormGroup;
	pending = false;
	type: EntityMetadata;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private dlgSrv: DialogService,
		private creatingDlgService: CrudDialogService) {
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
			console.log(this.type);
			this.creatingDlgService.create(this.group, this.type)
				.pipe(takeUntil(this._destroy$))
				.subscribe(id => {
					console.log(id);
					this.pending = false;
					if (this.type.createDestUrl) this.router.navigate([this.type.createDestUrl, id]);
					this.dlgSrv.close();
				});
		}
	}
}
