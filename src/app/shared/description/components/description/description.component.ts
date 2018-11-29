import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'description-app',
	templateUrl: './description.component.html',
	styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

	@Input() description = '';
	@Input() hasLabel = false;
	@Output() update = new EventEmitter<string>();
	constructor() { }

	ngOnInit() {
	}

	updateDescription(isCancel: boolean = true, newDescription: string) {
		if (!isCancel) {
			this.update.emit(newDescription);
		}
	}
}
