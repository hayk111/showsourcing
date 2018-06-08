import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'input-price-currency-app',
	templateUrl: './input-price-currency.component.html',
	styleUrls: ['./input-price-currency.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceCurrencyComponent)]
})
export class InputPriceCurrencyComponent extends AbstractInput implements OnInit, OnDestroy {
	private formGroup: FormGroup;
	private sub: Subscription;

	constructor(protected cd: ChangeDetectorRef, private fb: FormBuilder) {
		super(cd);
		// this.formGroup = this.fb.group({
		// 	value: [],
		// 	currency: ['USD']
		// });
	}

	ngOnInit() {
		// this.sub = this.formGroup.valueChanges.subscribe(v => {
		// 	this.value = v;
		// 	this.onChangeFn(this.value);
		// });
		// this.formGroup.patchValue(this.value || {});
		if (!this.value)
			this.value = {};
	}

	ngOnDestroy() {
		// this.sub.unsubscribe();
	}

	set price(value: number) {
		this.value = {
			price: value,
			...this.value,
		};
		this.onChangeFn(this.value);
	}

	get price(): number {
		return (this.value || {}).value;
	}

	set currency(currency: any) {
		//
	}

	get currency(): any {
		return null;
	}

}
