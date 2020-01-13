import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'preview-header-buttons-app',
	templateUrl: './preview-header-buttons.component.html',
	styleUrls: ['./preview-header-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHeaderButtonsComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
