import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductVote } from '~models';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'vote-details-dialog-app',
	templateUrl: './vote-details-dialog.component.html',
	styleUrls: ['./vote-details-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteDetailsDialogComponent implements OnInit {

	@Input() votes: ProductVote[];

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	closeDlg() {
		this.dlgSrv.close();
	}

}
