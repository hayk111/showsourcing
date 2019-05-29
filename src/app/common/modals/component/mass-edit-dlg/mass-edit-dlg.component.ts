import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'mass-edit-dlg-app',
	templateUrl: './mass-edit-dlg.component.html',
	styleUrls: ['./mass-edit-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MassEditDlgComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
