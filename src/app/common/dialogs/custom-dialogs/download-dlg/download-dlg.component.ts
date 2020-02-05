import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CloseEventType, DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'download-dlg-app',
	templateUrl: './download-dlg.component.html',
	styleUrls: ['./download-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadDlgComponent {

	constructor(private dlgSrv: DialogService) { }

	close() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

}
