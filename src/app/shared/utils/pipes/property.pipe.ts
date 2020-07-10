import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'property'
})
export class PropertyPipe implements PipeTransform {

	transform(row: any, ...args: unknown[]): any {
		const propertyName = args[0];
		const propertyField: any = args[1];

		if (row && row.properties && !!row.properties.length) {
			const index = row.properties.findIndex(property => property.name === propertyName);

			if (index !== -1) {
				if (row.properties[index]) {
					try {
						const property = JSON.parse(row.properties[index].value);
						return propertyField ? property[propertyField] : property;
					} catch {
						return null;
					}
				}

				return null;
			}
		}

		return null;
	}

}
