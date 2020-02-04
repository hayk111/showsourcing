import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'dashboard-download-app',
	templateUrl: './dashboard-download.component.html',
	styleUrls: ['./dashboard-download.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDownloadComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
