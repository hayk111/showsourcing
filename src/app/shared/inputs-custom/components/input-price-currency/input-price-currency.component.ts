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
export class InputPriceCurrencyComponent extends AbstractInput implements OnInit {
	private formGroup: FormGroup;
	private sub: Subscription;

	constructor(protected cd: ChangeDetectorRef, private fb: FormBuilder) {
		super(cd);
	}

	ngOnInit() {
		if (!this.value)
			this.value = {};
	}

}
