import { Store } from '@ngrx/store';
import { createSelector } from 'reselect';
import { EntityRepresentation, Entity } from '../../utils/entities.utils';
import { FilterGroupName, FilterEntityClass } from '../../model/misc/filter.model';
import { selectEntityArray } from '../misc/utils.selector';
import { selectFiltersValues } from '../misc/filter.selectors';
import Log from '../../../../utils/logger/log.class';

export interface SmartSearch {
	repr: EntityRepresentation;
	selected: Array<any>;
	result: Array<Entity>;
}

export const searchEntity = (filterGroupName: FilterGroupName, fe: FilterEntityClass, str: string) => {
	const repr = fe.getEntityRepr();
	return createSelector(
		[
			selectEntityArray(repr),
			selectFiltersValues(filterGroupName, fe)
		], (entities, selected) => {
			Log.debug('search entity');
			// with no search terms we return all entities
			if (str === '')
				return { repr, selected, result: entities };
			else {
				const result = entities.filter(entity => entity.name.includes(str)) as Array<Entity>;
				return { repr, selected, result };
			}
		}
	);
};

export const searchEntities = (filterGroupName: FilterGroupName, fes: Array<FilterEntityClass>, str: string) => {
	const sels = fes.map(fe => searchEntity(filterGroupName, fe, str)) as any;
	return createSelector(
		sels,
		(...results) => {
			return results;
		}
	);
};

