import { ChangeDetectionStrategy, Component, Input, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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

	constructor(private dlgSrv: DialogService, @Inject(DOCUMENT) public document: Document) { }

	close() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	navigateToPlayMarket() {
		console.log('navigating ara...');
		this.document.location.href = 'https://play.google.com/store/apps/details?id=com.showsourcing.mobile&hl=en';
	}

	navigateToAppStore() {
		this.document.location.href = 'https://apps.apple.com/be/app/showsourcing-sourcing-app/id985133847';
	}

}
