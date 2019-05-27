import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ExtendedFieldDefinition, RequestTemplate } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { InputDirective } from '~shared/inputs';
import { TemplateMngmtService } from '~shared/template-mngmt/services/template-mngmt.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'template-mngmt-dlg-app',
	templateUrl: './template-mngmt-dlg.component.html',
	styleUrls: ['./template-mngmt-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMngmtDlgComponent extends AutoUnsub implements OnInit {

	private _templateSelected$ = new ReplaySubject<RequestTemplate>(1);
	// let's call queryOne to have the updates from cache
	private templateSelected$ = this._templateSelected$.asObservable().pipe(
		switchMap(tmp => this.templateMngmtSrv.getOne(tmp.id))
	);

	@Input()
	set templateSelected(tmp: RequestTemplate) {
		if (tmp) {
			this._templateSelected$.next(tmp);
			this._templateSelected = tmp;
		}
	}
	get templateSelected() {
		return this._templateSelected;
	}
	private _templateSelected: RequestTemplate;

	@ViewChild(InputDirective) inp: InputDirective;

	static count = 0;
	count = TemplateMngmtDlgComponent.count++;
	createCtrl = new FormControl();
	pending = false;

	templates$: Observable<RequestTemplate[]>;
	initialState = new Map<ExtendedFieldDefinition, boolean>();
	newState = new Map<ExtendedFieldDefinition, boolean>();

	constructor(
		private dlgSrv: DialogService,
		public templateMngmtSrv: TemplateMngmtService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.templates$ = this.templateMngmtSrv.getTemplates();
		this.templateSelected$.pipe(
			switchMap(templateSelected => this.templateMngmtSrv.getExtendedFields(templateSelected)),
		).subscribe(fieldsChecked => {
			this.initialState = new Map(fieldsChecked);
			this.newState = new Map(fieldsChecked);
			this.cd.markForCheck();
		});
		this.inp.focus();
	}

	close(event: MouseEvent) {
		event.stopPropagation();
		this.dlgSrv.close({ type: CloseEventType.OK, data: { template: this.templateSelected } });
	}

	createTemplate() {
		const name = this.createCtrl.value;
		if (name) {
			this.pending = true;
			const reqTmp = new RequestTemplate({ name });
			this.templateMngmtSrv.createNewTemplate(reqTmp).pipe(
				tap(tmp => this.templateSelected = tmp),
				switchMap(_ => this.templateMngmtSrv.refetch())
			).subscribe(_ => { this.pending = false; this.cd.markForCheck(); });
			this.createCtrl.reset();
		}
	}

	deleteTemplate(event: MouseEvent, tmp: RequestTemplate) {
		event.stopPropagation();
		return this.templateMngmtSrv.deleteTemplate(tmp).subscribe();
	}

	openCnfrm(event) {
		event.stopPropagation();
		const templateSelected = this.templateSelected;
		this.dlgSrv.open(ConfirmDialogComponent).pipe(
		).subscribe(_ => this.dlgSrv.open(TemplateMngmtDlgComponent, { templateSelected }));
	}

	toggle(field: ExtendedFieldDefinition) {
		this.newState.set(field, !this.newState.get(field));
		this.cd.markForCheck();
	}

	reset() {
		this.newState = new Map(this.initialState);
		this.cd.markForCheck();
	}

	save() {
		const requestedFields: ExtendedFieldDefinition[] = [];
		this.newState.forEach((value, key) => {
			if (value)
				requestedFields.push(key);
		});
		this.templateSelected = { ...this.templateSelected, requestedFields };
		this.templateMngmtSrv.updateTemplate(this.templateSelected).subscribe();
	}

	hasChanged() {
		return !Array.from(this.initialState).every(([key, val]) => val === this.newState.get(key));
	}

	isSelected(template: RequestTemplate) {
		return this.templateSelected.id === template.id;
	}
}
