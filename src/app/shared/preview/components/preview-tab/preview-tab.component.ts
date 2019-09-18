import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'preview-tab-app',
	templateUrl: './preview-tab.component.html',
	styleUrls: ['./preview-tab.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTabComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
