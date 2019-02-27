import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'settings-export-app',
	templateUrl: './settings-export.component.html',
	styleUrls: ['./settings-export.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsExportComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
