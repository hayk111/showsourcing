import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Observable, Subject, ReplaySubject, of } from 'rxjs';
import { switchMap, takeUntil, tap, map, filter } from 'rxjs/operators';
import { ExtendedFieldDefinition, RequestTemplate } from '~core/models';
import { CloseEventType, DialogService, CloseEvent } from '~shared/dialog';
import { TemplateMngmtService } from '~shared/template-mngmt/services/template-mngmt.service';
import { AutoUnsub } from '~utils';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'template-mngmt-dlg-app',
	templateUrl: './template-mngmt-dlg.component.html',
	styleUrls: ['./template-mngmt-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMngmtDlgComponent extends AutoUnsub implements OnInit {

	createCtrl = new FormControl();


	private _templateSelected$ = new ReplaySubject<RequestTemplate>(1);
	// let's call queryOne to have the updates from cache
	private templateSelected$ = this._templateSelected$.asObservable().pipe(
		switchMap(tmp => this.templateMngmtSrv.getOne(tmp.id))
	);

	@Input()
	set templateSelected(tmp: RequestTemplate) {
		this._templateSelected$.next(tmp);
		this._templateSelected = tmp;
	}
	get templateSelected() {
		return this._templateSelected;
	}
	private _templateSelected: RequestTemplate;

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
	}

	close(event: MouseEvent) {
		event.stopPropagation();
		this.dlgSrv.close({ type: CloseEventType.OK, data: { template: this.templateSelected } });
	}

	createTemplate() {
		const name = this.createCtrl.value;
		if (name) {
			const reqTmp = new RequestTemplate({ name });
			this.templateMngmtSrv.createNewTemplate(reqTmp)
				.subscribe(tmp => this.templateSelected = tmp);
			this.createCtrl.reset();
		}
	}

	deleteTemplate(event: MouseEvent, tmp: RequestTemplate) {
		event.stopPropagation();
		this.dlgSrv.open(ConfirmDialogComponent).pipe(
			switchMap((evt: CloseEvent) => {
				if (evt.type === CloseEventType.OK)
					return this.templateMngmtSrv.deleteTemplate(tmp);
				else
					of(false);
			})
		).subscribe();
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
		const tmp = new RequestTemplate({ id: this.templateSelected.id, requestedFields });
		this.templateMngmtSrv.updateTemplate(tmp).subscribe();
	}

	hasChanged() {
		return !Array.from(this.initialState).every(([key, val]) => val === this.newState.get(key));
	}

	isSelected(template: RequestTemplate) {
		return this.templateSelected.id === template.id;
	}
}
