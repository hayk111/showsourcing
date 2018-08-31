import { LOCALE_ID, Inject, Pipe, PipeTransform } from '@angular/core';
import { currencyMap, countryMap, harbourMap, incoTermsMap, statusMap } from '~utils/constants';

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
	localeCountry: string;

	constructor(@Inject(LOCALE_ID) private locale: string) {
		if (locale) {
			const localeTokens = locale.split('-');
			if (localeTokens && localeTokens.length > 0) {
				this.localeCountry = localeTokens[0];
			}
		}
	}

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
			case 'status':
			case 'statuses':
				constMap = statusMap;
				break;
			default: throw Error(`The target ${args[0]} for the const pipe is not a valid const`);
		}
		const constObject = constMap[value];

		if (!constObject)
			return value;

		if (!propertyName)
			return constMap[value].name;

		// Try to translate the value
		return this.getI18nValue(constMap[value], propertyName, this.localeCountry) || value;
	}

	/**
	 * Leverage the const structure to translate the value and display the value if no translation.
	 *
	 * The structure of the const structure is the following:
	 *
	 * export const statusMap = {
	 *   '_GetQuotation': {
	 *     locales: {
	 *	     en: {
	 *	       name: 'Get Quotation'
	 *   },
	 *   (...)
	 * };
	 *
	 */
	getI18nValue(obj: any, propertyName: string, localeCountry: string) {
		const localeValues = obj.locales;
		if (localeValues) {
			if (localeCountry && localeValues[localeCountry]) {
				return localeValues[localeCountry][propertyName];
			} else if (localeValues.en) {
				return localeValues.en[propertyName];
			}
		}
		return ''	;
	}

}
