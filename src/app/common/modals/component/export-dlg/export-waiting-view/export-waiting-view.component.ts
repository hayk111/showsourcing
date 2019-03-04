import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { Router } from '@angular/router';

@Component({
	selector: 'export-waiting-view-app',
	templateUrl: './export-waiting-view.component.html',
	styleUrls: ['./export-waiting-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportWaitingViewComponent implements OnInit {

	@Input() fileReady: boolean;
	@Input() pending: boolean;
	@Output() download = new EventEmitter<null>();

	constructor(
		public dlgSrv: DialogService,
		private router: Router
	) { }

	ngOnInit() {
	}

	goToExports() {
		this.router.navigate(['settings', 'exports']);
		this.dlgSrv.close();
	}

}
