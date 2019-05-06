import { AfterViewInit, Component, Input, OnInit, ViewChild, ChangeDetectorRef, OnChanges, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, empty } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
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
export class CreationDialogComponent extends AutoUnsub implements OnInit, AfterViewChecked {

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
		private cdr: ChangeDetectorRef,
		private ermSrv: ERMService
	) {
		super();
	}

	// we need this on viewChecked since if the user introduces a name that already exists, we have to focus again
	ngAfterViewChecked() {
		if (this.input)
			this.input.focus();
	}

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required] // ValidateNameNotEqual.equalValidator(this.ermService, this.type) in case is fixed by angular
		});
		this.exists$ = this.typed$
			.pipe(
				debounceTime(200),
				takeUntil(this._destroy$),
				switchMap((str) => this.crudDlgSrv.checkExists(this.type, str)),
			);
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
		this.crudDlgSrv.checkExists(this.type, name).pipe(
			switchMap(exists => {
				return exists ? Observable.create(obs => obs.next(false)) : this.createItem({ name, ...this.extra });
			}),
		).subscribe(item => {
			if (item)
				this.dlgSrv.close({ type: CloseEventType.OK, data: item });
			this.pending = false;
			this.cdr.markForCheck();
		});
	}

	private createItem(item) {
		const entity = new this.type.constClass(item);
		return this.ermSrv.getGlobalService(this.type)
			.create(entity);
	}

}
