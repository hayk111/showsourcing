import { Pipe, PipeTransform, Optional, LOCALE_ID, Inject } from '@angular/core';
import { countryMap } from '~utils';

@Pipe({
	name: 'countryCity',
})
/**
 * Pipe that formats the correct fomrating for a country and a city
 */
export class CountryCityPipe implements PipeTransform {
	localeCountry: string;

	constructor(@Optional() @Inject(LOCALE_ID) private locale?: string) {
		if (locale) {
			const localeTokens = locale.split('-');
			if (localeTokens && localeTokens.length > 0) {
				this.localeCountry = localeTokens[0];
			}
		}
	}

	transform(value: { country?: string, city?: string }): any {
		const city = value.city;
		const country = value.country;
		let cityCountryName = '';

		if (city && country)
			cityCountryName = city + ', ' + this.getCountry(country);
		else if (city)
			cityCountryName = city;
		else if (country)
			cityCountryName = this.getCountry(country);
		return cityCountryName;
	}

	private getCountry(country: string) {
		const value = countryMap[country] ? countryMap[country] : country;
		return this.getI18nValue(value, 'name', this.localeCountry) || value;
	}

	private getI18nValue(obj: any, propertyName: string, localeCountry: string) {
		const localeValues = obj.locales;
		if (localeValues) {
			if (localeCountry && localeValues[localeCountry]) {
				return localeValues[localeCountry][propertyName];
			} else if (localeValues.en) {
				return localeValues.en[propertyName];
			}
		}
		return '';
	}

}
