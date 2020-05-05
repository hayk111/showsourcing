import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'property'
})
export class PropertyPipe implements PipeTransform {

	transform(row: any, ...args: unknown[]): any {

		const propertyName = args[0];

		if (!!row.properties.length) {
			const index = row.properties.findIndex(property => property.name === propertyName);

			if (index !== -1) {
				return index !== -1 ? row.properties[index].value : null;
			}
		}

		return null;
	}

}
