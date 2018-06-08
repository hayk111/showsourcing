import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-input-price-currency',
	templateUrl: './input-price-currency.component.html',
	styleUrls: ['./input-price-currency.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceCurrencyComponent)]
})
export class InputPriceCurrencyComponent extends AbstractInput implements OnInit {
	formGroup: FormGroup;
	sub: Subscription;

	constructor(protected cd: ChangeDetectorRef, private fb: FormBuilder) {
		super(cd);
		this.formGroup = this.fb.group({
			value: [],
			currency: ['USD']
		});
	}

	ngOnInit() {
		// this.sub = this.formGroup.valueChanges.subscribe(v => this.value = v)
	}

}
