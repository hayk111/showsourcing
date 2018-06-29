import { EntityMetadata } from '~models';
import { AbstractControl } from '@angular/forms';
import { ERMService } from '~global-services/_global/erm.service';
import { map } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { debug } from '~utils';

export class ValidateNameNotEqual {
	static equalValidator(ermService: ERMService, type: EntityMetadata) {
		return (control: AbstractControl) => {
			return ermService.getGlobalService(type)
				.selectMany(of(new SelectParams({ query: `name == "${control.value}"` })))
				.pipe(
					map(result => ({ nameTaken: !!result[0] }))
				);
		};
	}
}
