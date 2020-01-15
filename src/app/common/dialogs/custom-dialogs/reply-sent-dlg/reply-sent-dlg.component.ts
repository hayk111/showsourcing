import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'reply-sent-dlg-app',
	templateUrl: './reply-sent-dlg.component.html',
	styleUrls: ['./reply-sent-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplySentDlgComponent implements OnInit {

	// can be px, vh, 1%...
	@Input() height = '80vh';
	@Input() actionName = this.translate.instant('text.reply');
	constructor(
		private dlgSrv: DialogService,
		private translate: TranslateService
	) { }

	ngOnInit() {
	}

	get style() {
		return { height: this.height ? `${this.height}` : 'unset' };
	}

	close() {
		this.dlgSrv.close();
	}

}
