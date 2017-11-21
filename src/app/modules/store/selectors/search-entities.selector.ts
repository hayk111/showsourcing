import { selectSlice } from "./slice.selector";
import { EntityState, Entity } from "../utils/entities.utils";
import { Product } from "../model/product.model";
import { deepCopy } from "../utils/deep-copy.utils";
import { selectFilterValuesForCategory } from "./filter.selectors";
import { FilterGroupName, FilterTarget } from "../model/filter.model";



export const searchEntities = (filterGroupName, str: string) => state => {
	const toBeChecked = [
		FilterTarget.suppliers,
		FilterTarget.categories,
		FilterTarget.events,
		FilterTarget.tags,
		// FilterTarget.projects
	];
	let foundValues = findVals(toBeChecked, str, state);
	// making copy of returned since we are about to add selection to those
	foundValues = deepCopy(foundValues);
	addSelection(filterGroupName, foundValues, state);
	return foundValues;
}

const findVals = (toBeChecked, str, state) => {
	const foundValues = [];
	// for each in toBeChecked, we add it to returned if the search term is found in 
	// the name of the entity.
	toBeChecked.forEach(entityName => {
		const addedEntity = { entityName, values: [] };
		foundValues.push(addedEntity);
		const itemEntityState = selectSlice(entityName)(state);
		Object.values(itemEntityState.byId).forEach(item => {
			if (item.name.includes(str))
				addedEntity.values.push(item);
		})
	});
	// remove property if the search didn't resolve to any entity being added to the array
	foundValues.forEach((etn, i) => {
		if (etn.values.length === 0)
			foundValues.splice(i, 1);
	});
	return foundValues;
}

const addSelection = (filterGroupName: FilterGroupName, 
									foundValues, state) => {
	foundValues.forEach(ent => {
		const vals = selectFilterValuesForCategory(filterGroupName, ent.entityName)(state);
		ent.values.forEach(v => {
			debugger;
			// tilde checks if it's found
			if (~vals.indexOf(v.id))
				v.checked = true;
		});		
	});
}

