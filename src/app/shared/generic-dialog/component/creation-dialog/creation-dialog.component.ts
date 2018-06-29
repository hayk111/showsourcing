import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { CrudDialogService } from '~shared/generic-dialog/services/crud-dialog.service';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { ValidateNameNotEqual } from '~shared/inputs/validators/async-name.validator';
import { ERMService } from '~global-services/_global/erm.service';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './creation-dialog.component.html',
	styleUrls: ['./creation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationDialogComponent extends AutoUnsub implements AfterViewInit, OnInit {

	group: FormGroup;
	pending = false;
	@Input() type: EntityMetadata;
	@Input() shouldRedirect = false;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService,
		private ermService: ERMService) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required, ValidateNameNotEqual.equalValidator(this.ermService, this.type)]
		});
	}

	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}

	test() {
		console.log(this.group);
	}

	onSubmit() {
		if (this.group.valid) {
			this.pending = true;
			this.crudDlgSrv.create(this.group, this.type)
				.pipe(takeUntil(this._destroy$))
				.subscribe(id => {
					this.pending = false;
					if (this.shouldRedirect) {
						if (this.type.destUrl) this.router.navigate([this.type.destUrl, id.id]);
						else throw Error(`no destination url`);
					}
					this.dlgSrv.close();
				});
		}
	}
}
