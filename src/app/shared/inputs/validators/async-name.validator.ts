import { EntityMetadata } from '~models';
import { AbstractControl } from '@angular/forms';
import { ERMService } from '~global-services/_global/erm.service';
import { map, first } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';

export class ValidateNameNotEqual {
	static equalValidator(ermService: ERMService, type: EntityMetadata) {
		return (control: AbstractControl) => {
			return ermService.getGlobalService(type)
				.queryOneByPredicate(`name == "${control.value}"`)
				.pipe(
					first(),
					map(result => ({ nameTaken: result.length > 0 }))
				);
		};
	}
}
