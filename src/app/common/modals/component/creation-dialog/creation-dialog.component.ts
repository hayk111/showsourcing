import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'subscriptions-transport-ws';
import { CrudDialogService } from '~common/modals/services/crud-dialog.service';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { EntityMetadata } from '~models';
import { CloseEventType } from '~shared/dialog';
import { DialogService } from '~shared/dialog/services';
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
	// extra properties to put on the object
	@Input() extra: any;
	@ViewChild(InputDirective) input: InputDirective;
	private typed$: Subject<string> = new Subject();
	exists$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService,
		private ermSrv: ERMService
	) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required] // ValidateNameNotEqual.equalValidator(this.ermService, this.type) in case is fixed by angular
		});
		this.exists$ = this.typed$
			.pipe(
				debounceTime(1000),
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
		if (!this.group.valid) {
			return;
		}
		const name = this.group.value.name.trim();
		this.pending = true;
		this.createItem({ name, ...this.extra }).pipe(
			tap(_ => this.pending = false)
		).subscribe(item => this.dlgSrv.close({ type: CloseEventType.OK, data: item }));
	}

	private createItem(item) {
		const entity = new this.type.constClass(item);
		return this.ermSrv.getGlobalService(this.type)
			.create(entity);
	}

}
