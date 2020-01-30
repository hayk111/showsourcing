import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { CrudDialogService } from '~common/dialogs/services/crud-dialog.service';
import { ERMService } from '~core/orm/erm.service';
import { EntityMetadata } from '~core/orm/models';
import { CloseEventType } from '~shared/dialog';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './creation-dialog.component.html',
	styleUrls: ['./creation-dialog.component.scss']
})
export class CreationDialogComponent extends AutoUnsub implements OnInit, AfterViewInit {

	group: FormGroup;
	pending = false;
	@Input() type: EntityMetadata;
	// extra properties to put on the object
	@Input() extra: any;
	/** whether we display buttons create & stay + create & go */
	@Input() canRedirect = false;
	@ViewChild(InputDirective, { static: false }) input: InputDirective;
	private typed$: ReplaySubject<string> = new ReplaySubject();
	exists$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService,
		private cdr: ChangeDetectorRef,
		private ermSrv: ERMService
	) {
		super();
	}

	ngAfterViewInit() {
		if (this.input)
			this.input.focus();
	}

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required] // ValidateNameNotEqual.equalValidator(this.ermService, this.type) in case is fixed by angular
		});
		this.exists$ = this.typed$
			.pipe(
				debounceTime(400),
				takeUntil(this._destroy$),
				switchMap((str) => this.crudDlgSrv.checkExists(this.type, str)),
			);
	}

	checkExists() {
		this.typed$.next(this.group.get('name').value);
	}

	onSubmit(redirect = true) {
		if (!this.group.valid)
			return;

		const name = this.group.value.name.trim();
		this.pending = true;
		this.crudDlgSrv.checkExists(this.type, name).pipe(
			switchMap(exists => {
				return exists ? Observable.create(obs => obs.next(false)) : this.createItem({ name, ...this.extra });
			}),
		).subscribe(item => {
			if (this.extra && 'onProjectCreated' in this.extra)
				this.extra.onProjectCreated(item);

			if (item)
				this.dlgSrv.close({ type: CloseEventType.OK, data: { redirect, item } });
			this.pending = false;
			this.cdr.markForCheck();
		});
	}

	private createItem(item) {
		if ('onProjectCreated' in item) {
			delete item.onProjectCreated;
		}

		const entity = new this.type.constClass(item);

		return this.ermSrv.getGlobalService(this.type)
			.create(entity);
	}

}
