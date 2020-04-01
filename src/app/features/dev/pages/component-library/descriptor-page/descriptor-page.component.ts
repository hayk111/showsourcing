import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { descriptorMock } from './descriptor.mock';

@Component({
	selector: 'app-descriptor-page',
	templateUrl: './descriptor-page.component.html',
	styleUrls: ['./descriptor-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptorPageComponent implements OnInit {
	descriptor = descriptorMock;
	style = 'form';
	columnAmount = 1;
	updateOn = 'blur';
	properties = [];
	constructor() { }

	ngOnInit() {
	}

}
