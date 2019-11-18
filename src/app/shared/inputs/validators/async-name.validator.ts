import { EntityMetadata } from '~models';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { ERMService } from '~entity-services/_global/erm.service';
import { map, first } from 'rxjs/operators';
import { SelectParams } from '~entity-services/_global/select-params';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ValidateNameNotEqual implements AsyncValidator {

	constructor(private ermService: ERMService, private type: EntityMetadata) { }

	validate(control: AbstractControl) {
		return this.ermService.getGlobalService(this.type)
			.queryOneByPredicate(`name == "${control.value}"`)
			.pipe(
				first(),
				map(result => ({ nameTaken: result.length > 0 }))
			);
	}
}
