import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'app-input-price-currency',
	templateUrl: './input-price-currency.component.html',
	styleUrls: ['./input-price-currency.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceCurrencyComponent)]
})
export class InputPriceCurrencyComponent extends AbstractInput implements OnInit {

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
	}

}
