import { Pipe, PipeTransform } from '@angular/core';
import { currencyMap, countryMap, harbourMap, incoTermsMap } from '~utils/constants';

/**
 * transform a const to it's given name or if any additional param is given the property named with that param
 *
 * `'USD'| const: 'currency'` ou `'USD' | const: 'currency': 'symbol'`
 *
 * the first will give the name of the currency USD which is US Dollar; the second will give you '$'
 */
@Pipe({
	name: 'const'
})
export class ConstPipe implements PipeTransform {

	transform(value: any, ...args: string[]): any {
		let constMap;
		const constName = args[0];
		const propertyName = args[1];
		switch (constName) {
			case 'currency':
			case 'currencies':
				constMap = currencyMap;
				break;
			case 'countries':
			case 'country':
				constMap = countryMap;
				break;
			case 'harbour':
			case 'harbours':
				constMap = harbourMap;
				break;
			case 'incoTerm':
			case 'incoTerms':
				constMap = incoTermsMap;
				break;
			default: throw Error(`The target ${args[0]} for the const pipe is not a valid const`);
		}
		const constObject = constMap[value];

		if (!constObject)
			return '';

		if (!propertyName)
			return constMap[value].name;

		return constMap[value][propertyName];
	}

}
