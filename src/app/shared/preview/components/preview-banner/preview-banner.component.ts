import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'preview-banner-app',
	templateUrl: './preview-banner.component.html',
	styleUrls: ['./preview-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBannerComponent implements OnInit {

	@Output() closed = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
