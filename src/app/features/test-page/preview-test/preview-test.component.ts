import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-preview-test',
	templateUrl: './preview-test.component.html',
	styleUrls: ['./preview-test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTestComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
