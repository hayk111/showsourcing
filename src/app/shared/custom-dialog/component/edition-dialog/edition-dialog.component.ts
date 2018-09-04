import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable } from 'subscriptions-transport-ws';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { CrudDialogService } from '~shared/custom-dialog/services';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'edition-dialog-app',
	templateUrl: './edition-dialog.component.html',
	styleUrls: ['./edition-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditionDialogComponent extends AutoUnsub implements AfterViewInit {

	group: FormGroup;
	pending = false;
	@Input() type: EntityMetadata;
	@Input() entity: any;
	@Input() callback: Function;
	@ViewChild(InputDirective) input: InputDirective;
	private typed$: Subject<string> = new Subject();
	exists$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService) {
		super();
		this.group = this.fb.group({
			name: ['', Validators.required],
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
			if (!this.entity) throw Error(`null entity when editing dialog`);
			this.pending = true;
			this.crudDlgSrv.edit(this.group, this.type, this.entity)
				.pipe(takeUntil(this._destroy$))
				.subscribe(() => {
					this.pending = false;
					// this.callback(this.group.value.name); // delete all related to callbacks if not needed
					this.dlgSrv.close();
				});
		}
	}

}
