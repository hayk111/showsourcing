import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'preview-app',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2',
		'[class.alignRight]': 'align === "right"',
		'[class.alignLeft]': 'align === "left"'
	}
})
export class PreviewComponent implements OnInit {

	@Input() align: 'left' | 'right' = 'right';

	constructor() { }

	ngOnInit() {
	}

}
