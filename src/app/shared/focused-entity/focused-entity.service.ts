import { Injectable } from '@angular/core';
import { EntityTarget } from '~app/entity';

// service to save what entity is at the foreground.
// (eg: in supplier/details/8) the target at the forground is a supplier with id 8
@Injectable()
export class FocusedEntityService {
	target: EntityTarget;
}
