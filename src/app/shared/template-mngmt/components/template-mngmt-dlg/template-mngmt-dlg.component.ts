import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService, CloseEventType } from '~shared/dialog';
import { RequestTemplate, ExtendedField, ExtendedFieldDefinition } from '~core/models';
import { TemplateMngmtService } from '~shared/template-mngmt/services/template-mngmt.service';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
	selector: 'template-mngmt-dlg-app',
	templateUrl: './template-mngmt-dlg.component.html',
	styleUrls: ['./template-mngmt-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMngmtDlgComponent implements OnInit {

	templateSelected: RequestTemplate;
	templates$: Observable<RequestTemplate[]>;
	fieldChecked$: Observable<{ field: ExtendedFieldDefinition, checked: boolean }[]>;

	constructor(private dlgSrv: DialogService, private templateMngmtSrv: TemplateMngmtService) { }

	ngOnInit() {
		this.templates$ = this.templateMngmtSrv.getTemplates().pipe(
			tap(templates => this.templateSelected = templates[0])
		);
		this.fieldChecked$ = this.templates$.pipe(
			switchMap(_ => this.templateMngmtSrv.getExtendedFields(this.templateSelected))
		);

	}

	close(event: MouseEvent) {
		event.stopPropagation();
		this.dlgSrv.close({ type: CloseEventType.OK, data: { template: this.templateSelected } });
	}

}
