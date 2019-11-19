import { Pipe, PipeTransform } from '@angular/core';
import { ERM, EntityMetadata, EntityName } from '~models';

@Pipe({
	name: 'erm'
})
export class ERMPipe implements PipeTransform {

	transform(value: EntityName, singular: boolean): EntityMetadata {
		if (!value) {
			return;
		}

		if (singular === undefined) {
			return ERM[value];
		}

		return singular ? ERM[value].singular : ERM[value].plural;
	}

}
