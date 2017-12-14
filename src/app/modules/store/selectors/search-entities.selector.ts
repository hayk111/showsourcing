import { EntityState, Entity, EntityRepresentation } from '../utils/entities.utils';
import { Product } from '../model/product.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { FilterGroupName } from '../model/filter.model';
import { selectFilterValuesForEntity } from './filter.selectors';
import Log from '../../../utils/logger/log.class';
import { createSelector } from 'reselect';
import { selectEntity } from './utils.selector';


export interface SearchedEntity {
	entityRepr: EntityRepresentation;
	values: Array<any>;
	checked?: boolean;
}

export const searchEntities = (filterGroupName: FilterGroupName, entityReprs: Array<EntityRepresentation>, str: string) => {
	const searches: Array<any> = entityReprs.map(x => searchEntity(filterGroupName, x, str));
	// puts every search into an array
	return createSelector(searches as any, (...args) => {
		// just flatten the array of array
		return args.reduce((acc, curr) => {
			return acc.concat(curr);
		}, []);
	});
};

export const searchEntity = (filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, str: string) => {
	return createSelector(
		[
			selectEntity(entityRepr.entityName),
			selectFilterValuesForEntity(filterGroupName, entityRepr)
		],
		(items, vals) => {
			Log.debug(`searching ${entityRepr.entityName} for name with string ${str}`);
			let foundValues = findVal(entityRepr, str, items);
			// making copy so we don't mutate the state
			foundValues = deepCopy(foundValues);
			addSelection(filterGroupName, vals, foundValues);
			return foundValues;
	});
};

const findVal = (target: EntityRepresentation, str: string, items) => {
	const foundValues = [];
	const toBeAddedEntity = { entityRepr: target, values: [] };
	// for each values if term is present just push it
	Object.values(items.byId).forEach(item => {
		if (item.name.includes(str))
			toBeAddedEntity.values.push(item);
	});
	// if values are found add it to foundValues
	if (toBeAddedEntity.values.length > 0)
		foundValues.push(toBeAddedEntity);
	return foundValues;
};

const addSelection = (filterGroupName: FilterGroupName, vals: Array<any>, foundValues: Array<SearchedEntity>) => {
	foundValues.forEach((ent: SearchedEntity) => {
		ent.values.forEach(v => {
			// tilde checks if it's found
			if (~vals.indexOf(v.id))
				v.checked = true;
		});
	});
};
