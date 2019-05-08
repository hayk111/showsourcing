import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Observable, Subject, ReplaySubject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ExtendedFieldDefinition, RequestTemplate } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { TemplateMngmtService } from '~shared/template-mngmt/services/template-mngmt.service';
import { AutoUnsub } from '~utils';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'template-mngmt-dlg-app',
	templateUrl: './template-mngmt-dlg.component.html',
	styleUrls: ['./template-mngmt-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMngmtDlgComponent extends AutoUnsub implements OnInit {


	private templateSelected$ = new ReplaySubject<RequestTemplate>(1);
	@Input()
	set templateSelected(tmp: RequestTemplate) {
		this.templateSelected$.next(tmp);
		this._templateSelected = tmp;
	}
	get templateSelected() {
		return this._templateSelected;
	}
	private _templateSelected: RequestTemplate;

	templates$: Observable<RequestTemplate[]>;
	initialState: Map<ExtendedFieldDefinition, boolean>;
	newState: Map<ExtendedFieldDefinition, boolean>;

	constructor(
		private dlgSrv: DialogService,
		public templateMngmtSrv: TemplateMngmtService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.templates$ = this.templateMngmtSrv.getTemplates();
		combineLatest(this.templates$, this.templateSelected$).pipe(
			switchMap(([_, templateSelected]) => this.templateMngmtSrv.getExtendedFields(templateSelected)),
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

	createTemplate(name: string) {
		const reqTmp = new RequestTemplate({ name });
		this.templateMngmtSrv.createNewTemplate(reqTmp).subscribe();
	}

	deleteTemplate(event: MouseEvent, tmp: RequestTemplate) {
		event.stopPropagation();
		this.templateMngmtSrv.deleteTemplate(tmp);
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
}
