// import { EntityState, Entity, EntityRepresentation } from '../utils/entities.utils';
// import { Product } from '../model/product.model';
// import { deepCopy } from '../utils/deep-copy.utils';
// import { FilterGroupName, FilterRepresentation } from '../model/filter.model';
// import { selectFilterValuesForEntity } from './filter.selectors';
// import Log from '../../../utils/logger/log.class';
// import { createSelector } from 'reselect';
// import { selectEntity } from './utils.selector';



// const addSelection = (vals: Array<any>, entities: Array<Entity>) => {
// 	entities.forEach((ent: Entity) => {
// 			// tilde checks if it's found
// 			if (~vals.indexOf(ent.id))
// 				ent.checked = true;
// 	});
// };

// export const searchEntity = ( repr: EntityRepresentation, str: string) => {
// 	return createSelector(
// 		[
// 		selectEntity(repr.entityName)], (entityState) => {
// 			const entities = Object.values(entityState.byId);
// 			// with no search terms we return all entities
// 			if (str === '')
// 				return entities;
// 			else
// 				return entities.filter(entity => entity.name.includes(str)) as Array<Entity>;
// 		}
// 	);
// };

// export const searchEntityWithFilters = (filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, str: string) => {
// 	return createSelector(
// 		[
// 			searchEntity(entityRepr, str),
// 			selectFilterValuesForEntity(filterGroupName, entityRepr as FilterRepresentation)
// 		],
// 		(items, vals) => {
// 			Log.debug(`searching ${entityRepr.entityName} for name with string ${str}`);
// 			const copy = deepCopy(items);
// 			addSelection(vals, copy);
// 			return { entityRepr, items: copy };
// 	});
// };

// export const searchEntitiesWithFilters = (filterGroupName: FilterGroupName, entityRepr: Array<EntityRepresentation>, str: string) => {
// 	const searches: Array<any> = entityRepr.map(x => searchEntityWithFilters(filterGroupName, x, str));
// 	// puts every search into an array
// 	return createSelector(searches as any, (...args) => {
// 		let total = 0;
// 		args.forEach(r => total += r.items.length);
// 		return { total, result: args };
// 	});
// };

