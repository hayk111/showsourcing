import { api, Product } from 'lib';
import { Observable, of } from 'rxjs';
import { Price } from '~core/erm3';

export function updateProductPriceMOQ(
	prevPrice: Price,
	priceVal: Partial<Price>,
	type: 'price' | 'moq',
	productId: string
	): Observable<Product[]> {
	let price: Price;
	let shallUpdate = false;

	if (type === 'price') {
		const currency = priceVal && priceVal.currency ? priceVal.currency : 'USD';
		const value = priceVal && priceVal.value ? priceVal.value : undefined;
		const previousValue = prevPrice && prevPrice.value ? prevPrice.value : undefined;

		// TODO: when currency is ready to add a currency condition also
		shallUpdate = previousValue !== value;

		price =  {
			...prevPrice,
			value,
			currency
		};

		if (!value) {
			delete price.currency;
			delete price.value;
		}
	} else {
		const moq = priceVal && priceVal.minimumOrderQuantity ? priceVal.minimumOrderQuantity : undefined;
		const previousMoq = prevPrice && prevPrice.minimumOrderQuantity ? prevPrice.minimumOrderQuantity : undefined;

		shallUpdate = previousMoq ? previousMoq !== moq : true;

		price = {
			...prevPrice,
			minimumOrderQuantity: moq
		};

		if (!moq) {
			delete price.minimumOrderQuantity;
		}
	}

	if (shallUpdate) {
		return api.Product.update([{
			id: productId,
			propertiesMap: {
				price
			}
		}]).local$;
	}

	return of([]);
}
