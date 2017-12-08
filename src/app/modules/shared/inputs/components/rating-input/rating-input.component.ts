import { Component, OnInit, Injector, forwardRef, EventEmitter, Output } from '@angular/core';
import { AbstractInput } from '../../abstract-input.class';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
	selector: 'rating-input-app',
	templateUrl: './rating-input.component.html',
	styleUrls: ['./rating-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RatingInputComponent),
			multi: true
		}
	]
})
export class RatingInputComponent extends AbstractInput implements OnInit {
	@Output() change = new EventEmitter<number>();
	constructor(protected inj: Injector) {
		super(inj);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClick(i) {
		this.change.emit(i + 1);
		this.onChange(i + 1);
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
