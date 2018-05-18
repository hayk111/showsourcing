import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SelectorsService } from '~shared/selectors/selectors.service';
import { CustomSelector } from '~shared/selectors/utils/custom-selector.class';
import { makeAccessorProvider } from '~shared/inputs';


@Component({
	selector: 'selector-currency-app',
	templateUrl: './selector-currency.component.html',
	styleUrls: ['./selector-currency.component.scss'],
	providers: [makeAccessorProvider(SelectorCurrencyComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCurrencyComponent extends CustomSelector<string> {

	constructor(private srv: SelectorsService) {
		super();
		// this.choices = this.srv.getCurrencies();
	}

}
