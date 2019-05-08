import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { translate } from '~utils';

@Component({
	selector: 'reply-sent-dlg-app',
	templateUrl: './reply-sent-dlg.component.html',
	styleUrls: ['./reply-sent-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplySentDlgComponent implements OnInit {

	// can be px, vh, 1%...
	@Input() height = '80vh';
	@Input() actionName = translate('reply');
	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	get style() {
		return { height: this.height ? `${this.height}` : 'unset' };
	}

	close() {
		this.dlgSrv.close();
	}

}
