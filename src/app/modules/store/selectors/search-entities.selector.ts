import { selectSlice } from "./slice.selector";
import { EntityState, Entity } from "../utils/entities.utils";
import { Product } from "../model/product.model";



export const searchEntities = (str: string) => state => {
	const toBeChecked = ['suppliers', 'categories', 'events', 'tags'];
	const returned = [];
	// for each in toBeChecked, we add it to returned if the search term is found in 
	// the name of the entity.
	toBeChecked.forEach(entityName => {
		const addedEntity = { entityName, values: [] };
		returned.push(addedEntity);
		const itemEntityState = selectSlice(entityName)(state);
		Object.values(itemEntityState.byId).forEach(item => {
			if (item.name.includes(str))
				addedEntity.values.push(item);
		})
	});
	// remove property if the search didn't resolve to any entity being added to the array
	returned.forEach((etn, i) => {
		if (etn.values.length === 0)
			returned.splice(i, 1);
	})
	return returned;
}

