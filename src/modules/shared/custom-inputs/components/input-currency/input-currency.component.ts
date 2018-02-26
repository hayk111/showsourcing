import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrencies } from '../../../../store/selectors/entities/currencies.selector';
import { AbstractInput, makeAccessorProvider } from '../../../inputs/abstract-input.class';
import { selectEntityArray } from '../../../../store/selectors/misc/utils.selector';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

// this input is needed because the backend wants an object when updating a product.currency for example,
// instead of just the id.
@Component({
	selector: 'input-currency-app',
	templateUrl: './input-currency.component.html',
	styleUrls: ['./input-currency.component.scss'],
	providers: [ makeAccessorProvider(InputCurrencyComponent) ]
})
export class InputCurrencyComponent extends AbstractInput implements OnInit {
	currencies$;
	currencies;
	constructor(private store: Store<any>) { super(); }

	ngOnInit() {
		this.currencies$ = this.store.select(selectCurrencies);
		this.currencies$.takeUntil(this._destroy$).subscribe(currencies => this.currencies = currencies);
	}

	onChange(event) {
		const value = event.target.value;
		const picked = this.currencies.byId[value];
		super.onChange(picked);
	}

}
