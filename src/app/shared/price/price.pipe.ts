import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'ssPrice'
})
export class SSPricePipe implements PipeTransform {
	transform(price: any, roundedTo = 2): any {
		if (!isNaN(price)) {
			return (price / 10000).toFixed(roundedTo);
		}
		return 0;
	}
}
