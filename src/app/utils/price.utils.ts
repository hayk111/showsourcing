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

	if (type === 'price') {
		const currency = priceVal?.currency?.code || priceVal?.currency || 'USD';
		const value = priceVal?.value || undefined;

		price = {
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

		price = {
			...prevPrice,
			minimumOrderQuantity: moq
		};

		if (!moq) {
			delete price.minimumOrderQuantity;
		}
	}

	return api.Product.update([{
		id: productId,
		propertiesMap: {
			price
		}
	}]).local$;
}
