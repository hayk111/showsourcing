import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { Price } from '~core/orm/models';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Pipe({
	name: 'appPrice'
})
export class PricePipe implements PipeTransform {

	transform(value: number, roundedTo = 2): any {
		const numberPipe = new DecimalPipe(this._locale);
		let valueStr;
		if (!isNaN(value)) {
			value = Number((value / 10000).toFixed(roundedTo));
			valueStr = numberPipe.transform(value);
		} else {
			valueStr = '-';
		}
		return valueStr;
	}

	constructor(@Inject(LOCALE_ID) private _locale: string) { }
}
