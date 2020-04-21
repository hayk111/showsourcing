import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'editable-container-page-app',
	templateUrl: './editable-container-page.component.html',
	styleUrls: ['./editable-container-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableContainerPageComponent implements OnInit {
	ctrl1 = new FormControl('this text is editable');
	ctrl2 = new FormControl();
	ctrl3 = new FormControl();
	ctrlPackaging = new FormControl();
	priceMatrix;
	constructor() { }

	ngOnInit() {
	}

}
