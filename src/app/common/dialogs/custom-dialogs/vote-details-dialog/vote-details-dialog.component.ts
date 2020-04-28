import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DialogService } from '~shared/dialog/services';
import { Vote } from '~core/erm3/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'vote-details-dialog-app',
	templateUrl: './vote-details-dialog.component.html',
	styleUrls: ['./vote-details-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteDetailsDialogComponent extends TrackingComponent implements OnInit {

	@Input() votes: Vote[];

	constructor(private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {

	}

	closeDlg() {
		this.dlgSrv.close();
	}

}
