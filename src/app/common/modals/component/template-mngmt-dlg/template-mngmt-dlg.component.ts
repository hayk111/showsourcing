import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap, distinctUntilChanged, takeUntil, distinctUntilKeyChanged } from 'rxjs/operators';
import { ExtendedFieldDefinition, RequestTemplate, TemplateField } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { TemplateFieldService } from '~core/entity-services';
import { TemplateMngmtService } from '~common/modals/services/template-mngmt.service';

@Component({
	selector: 'template-mngmt-dlg-app',
	templateUrl: './template-mngmt-dlg.component.html',
	styleUrls: ['./template-mngmt-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMngmtDlgComponent extends AutoUnsub implements OnInit {

	private _templateSelected$ = new ReplaySubject<RequestTemplate>(1);
	// let's call queryOne to have the updates from cache
	templateSelected$ = this._templateSelected$.asObservable().pipe(
		distinctUntilKeyChanged('id'),
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

	@ViewChild(InputDirective, { static: true }) inp: InputDirective;

	trackByFn(index, item) {
		return item.key.id;
	}
	static count = 0;
	count = TemplateMngmtDlgComponent.count++;
	createCtrl = new FormControl();
	pending = false;

	templates$: Observable<RequestTemplate[]>;
	initialState: TemplateField[] = [];
	newState: TemplateField[] = [];

	constructor(
		private dlgSrv: DialogService,
		public templateMngmtSrv: TemplateMngmtService,
		private cd: ChangeDetectorRef,
	) {
		super();
	}

	ngOnInit() {
		this.templates$ = this.templateMngmtSrv.getTemplates();
		this.templateSelected$.pipe(
			switchMap(templateSelected => this.templateMngmtSrv.getTemplateFields(templateSelected.fields)),
			takeUntil(this._destroy$)
		).subscribe(fields => {
			this.pending = false;
			this.newState = fields;
			this.initialState = fields.map(f => ({ ...f }));
			this.cd.markForCheck();
		});
		this.inp.focus();
	}

	onUpdate() {
		this.cd.markForCheck();
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

	reset() {
		this.newState = this.initialState.map(f => ({ ...f }));
		this.cd.markForCheck();
	}

	save() {
		const fields = this.newState.filter(field => field.inTemplate);
		// delete local property before saving to db
		fields.forEach(f => delete f.inTemplate);
		this.templateSelected = { ...this.templateSelected, fields };
		this.templateMngmtSrv.updateTemplate(this.templateSelected).subscribe();
	}

	hasChanged() {
		return !this.initialState.every((field, index) => {
			return field.defaultValue === this.newState[index].defaultValue &&
				field.fixedValue === this.newState[index].fixedValue &&
				field.inTemplate === this.newState[index].inTemplate;
		});
	}

	isSelected(template: RequestTemplate) {
		return this.templateSelected.id === template.id;
	}

}
