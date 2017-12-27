import { Component, OnInit, Injector, forwardRef, EventEmitter, Output, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';


@Component({
	selector: 'rating-input-app',
	templateUrl: './rating-input.component.html',
	styleUrls: ['./rating-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingInputComponent {
	@Output() change = new EventEmitter<number>();
	@Input() value = 0;
	@Input() label = '';

	constructor() {
	}


	onClick(i) {
		this.change.emit(i + 1);
	}

	get starsArray() {
		const arr = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= this.value)
				arr.push(true);
			else
				arr.push(false);
		}
		return arr;
	}

}
