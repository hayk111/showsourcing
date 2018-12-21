import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-resume-app',
	templateUrl: './product-resume.component.html',
	styleUrls: ['./product-resume.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductResumeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
