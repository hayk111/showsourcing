import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { selectEntityById } from '../selectors/misc/utils.selector';
import { entityRepresentationMap, EntityRepresentation } from '../utils/entities.utils';
import { AutoUnsub } from '../../../utils/auto-unsub.component';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { EntityPipe } from './entity.pipe';

@Pipe({name: 'entityName'})
export class EntityNamePipe extends EntityPipe implements PipeTransform {

	transform(value: string, entityName: string): any {
		return super.transform(value, entityName, 'name');
	}

}
