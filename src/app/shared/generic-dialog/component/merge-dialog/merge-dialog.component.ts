import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'merge-dialog-app',
	templateUrl: './merge-dialog.component.html',
	styleUrls: ['./merge-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergeDialogComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
