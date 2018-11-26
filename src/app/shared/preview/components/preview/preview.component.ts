import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'preview-app',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
