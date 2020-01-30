import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { ERMService } from '~core/ORM/services/_global/erm.service';
import { EntityMetadata } from '~core/ORM/models';


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
