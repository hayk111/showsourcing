import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'reply-sent-dlg-app',
	templateUrl: './reply-sent-dlg.component.html',
	styleUrls: ['./reply-sent-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplySentDlgComponent implements OnInit {

	@Input() height: string;

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	get style() {
		return { height: this.height ? `${this.height}px` : 'unset' };
	}

	close() {
		this.dlgSrv.close();
	}

}
