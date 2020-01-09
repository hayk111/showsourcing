import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'preview-header-subtitle-app',
	templateUrl: './preview-header-subtitle.component.html',
	styleUrls: ['./preview-header-subtitle.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex color-txt-secondary dot-separator-txt-secondary'
	}
})
export class PreviewHeaderSubtitleComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
