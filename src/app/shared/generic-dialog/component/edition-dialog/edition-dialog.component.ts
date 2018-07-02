import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { CrudDialogService } from '~shared/generic-dialog/services';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { ERMService } from '~global-services/_global/erm.service';
import { Subject } from 'rxjs';
import { Observable } from 'subscriptions-transport-ws';

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
	@ViewChild(InputDirective) input: InputDirective;
	private typed$: Subject<string> = new Subject();
	exists$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private crudDlgSrv: CrudDialogService,
		private ermService: ERMService) {
		super();
		this.group = this.fb.group({
			name: ['', Validators.required],
		});
		this.exists$ = this.typed$
			.pipe(
				takeUntil(this._destroy$),
				switchMap((str) => this.crudDlgSrv.checkExists(this.ermService, this.type, str))
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
					this.dlgSrv.close();
				});
		}
	}

}
