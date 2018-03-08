import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'input-checkbox-app',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
})
export class InputCheckboxComponent implements OnInit {
	@Input() checked = false;
	// when clicked returns the opposite of current.
	// so if it's checked then we click it, it will return false
	@Output() update = new EventEmitter<boolean>();
	constructor() {}

	ngOnInit() {}

	onClick() {
		this.update.emit(!this.checked);
	}
}
