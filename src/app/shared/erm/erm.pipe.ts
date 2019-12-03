import { Pipe, PipeTransform } from '@angular/core';
import { ERM, EntityMetadata, EntityName } from '~models';

@Pipe({
	name: 'erm'
})
export class ERMPipe implements PipeTransform {

	transform(value: EntityName, property: string): EntityMetadata | string  {
		if (!value) {
			throw Error('no value specified for erm pipe');
		}

		const	erm = ERM[value];

		if (!erm) {
			throw Error(`ERM not found for ${value}`);
		}

		if (!property) {
			return erm;
		}

		return erm[property];
	}

}
