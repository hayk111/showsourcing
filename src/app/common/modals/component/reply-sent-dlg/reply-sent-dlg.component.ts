import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'reply-sent-dlg-app',
	templateUrl: './reply-sent-dlg.component.html',
	styleUrls: ['./reply-sent-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplySentDlgComponent implements OnInit {

	// can be px, vh, 1%...
	@Input() height: string;
	// TODO i18n
	@Input() actionName = 'reply';
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
