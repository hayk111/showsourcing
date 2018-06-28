import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'edition-dialog-app',
	templateUrl: './edition-dialog.component.html',
	styleUrls: ['./edition-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditionDialogComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
