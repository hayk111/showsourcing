import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'input-description-app',
	templateUrl: './input-description.component.html',
	styleUrls: ['./input-description.component.scss']
})
export class InputDescriptionComponent implements OnInit {
	@Input() description = '';
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
