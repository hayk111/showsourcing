import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable } from 'subscriptions-transport-ws';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog/services';
import { CrudDialogService } from '~common/dialog/services/crud-dialog.service';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './creation-dialog.component.html',
	styleUrls: ['./creation-dialog.component.scss']
})
export class CreationDialogComponent extends AutoUnsub implements AfterViewInit, OnInit {

	group: FormGroup;
	pending = false;
	@Input() type: EntityMetadata;
	@Input() shouldRedirect = false;
	@ViewChild(InputDirective) input: InputDirective;
	private typed$: Subject<string> = new Subject();
	exists$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required] // ValidateNameNotEqual.equalValidator(this.ermService, this.type) in case is fixed by angular
		});
		this.exists$ = this.typed$
			.pipe(
				takeUntil(this._destroy$),
				switchMap((str) => this.crudDlgSrv.checkExists(this.type, str))
			);
	}

	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}

	checkExists() {
		this.typed$.next(this.group.get('name').value);
	}

	onSubmit() {
		if (this.group.valid) {
			this.group.patchValue({ name: this.group.value.name.trim() });
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
