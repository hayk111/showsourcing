import { selectSlice } from './slice.selector';
import { EntityState, Entity } from '../utils/entities.utils';
import { Product } from '../model/product.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { FilterGroupName, entityRepresentationMap, EntityRepresentation } from '../model/filter.model';
import { selectFilterValuesForEntity } from './filter.selectors';
import Log from '../../../utils/logger/log.class';


export interface SearchedEntity {
	entityRepr: EntityRepresentation;
	values: Array<any>;
	checked?: boolean;
}
export const searchEntities = (filterGroupName, str: string) => (state): Array<SearchedEntity> => {
	Log.debug(`search entities for string ${str}`);
	const toBeChecked = [
		entityRepresentationMap.suppliers,
		entityRepresentationMap.categories,
		entityRepresentationMap.events,
		entityRepresentationMap.tags,
		entityRepresentationMap.projects
	];
	let foundValues = findVals(toBeChecked, str, state);
	// making copy of returned since we are about to add selection to those
	foundValues = deepCopy(foundValues);
	addSelection(filterGroupName, foundValues, state);
	return foundValues;
};

const findVals = (toBeChecked, str, state) => {
	const foundValues = [];

	toBeChecked.forEach((target: EntityRepresentation) => findVal(target, str, foundValues, state));
	return foundValues;
};

const findVal = (target: EntityRepresentation, str: string, foundValues: Array<SearchedEntity>, state) => {

	const toBeAddedEntity = { entityRepr: target, values: [] };
	// get values for specific entity
	const itemEntityState = selectSlice(target.entityName)(state);
	// for each values if term is present just push it
	Object.values(itemEntityState.byId).forEach(item => {
		if (item.name.includes(str))
			toBeAddedEntity.values.push(item);
	});
	// if values are found add it to foundValues
	if (toBeAddedEntity.values.length > 0)
		foundValues.push(toBeAddedEntity);
};

const addSelection = (filterGroupName: FilterGroupName,
									foundValues: Array<SearchedEntity>, state) => {

	foundValues.forEach((ent: SearchedEntity) => {
		const vals = selectFilterValuesForEntity(filterGroupName, ent.entityRepr)(state);
		ent.values.forEach(v => {
			// tilde checks if it's found
			if (~vals.indexOf(v.id))
				v.checked = true;
		});
	});
};
