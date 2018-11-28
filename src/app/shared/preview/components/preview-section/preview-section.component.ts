import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'preview-section-app',
	templateUrl: './preview-section.component.html',
	styleUrls: ['./preview-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewSectionComponent implements OnInit {

	@Input() title: string;

	constructor() { }

	ngOnInit() {
	}

}
