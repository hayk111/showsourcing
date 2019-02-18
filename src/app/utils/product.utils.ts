
export function getNestedValue(obj: any, property: string) {
	return property.split('.').reduce(function (result, key) {
		if (result) {
			return result[key];
		}
	}, obj);
}

export function getArrayData(array: Array<any>, property: string): Array<any> {
	return array.map(x => getNestedValue(x, property) || '-');
}


export function getPriceMatrixRowByLabel(
	array: Array<any>,
	_label: string
): Array<any> {
	const label = String(_label).toLowerCase();
	return array.map(quote => {
		const priceMatrix = quote.priceMatrix.rows.find(
			x => String(x.label).toLowerCase() === label
		);
		return (priceMatrix && priceMatrix.price.value) || '-';
	});
}

export function getPackagingString(array: Array<any>, property: string): Array<any> {
	return array.map(x => {
		const packaging = getNestedValue(x, property);
		if (!packaging) {
			return '';
		} else if (property.endsWith('itemsQuantity')) return packaging;
		return `${packaging.width || 0} x ${packaging.height ||
			0} x ${packaging.depth || 0}${packaging.unit}`;
	});
}
