import { deepCopy } from './deep-copy.utils';


export interface EntityState<G extends Entity> {
	pending: boolean;
	maxEntityCounter: number;
	byId: { [key: string]: G };
	ids: Array<string>;
}

export interface Entity {
	id: string | number;
	name?: string;
}

// since the response we receive is an array we have to loop
// through every thing in order to normalize our data.
// https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export function addEntities(state: any, entities: Array<any>) {
	const ids = [...state.ids];
	let maxEntityCounter = state.maxEntityCounter;
	const byId = { ...state.byId };
	entities.forEach(entity => {
		ids.push(entity.id);
		byId[entity.id] = entity;
		// the counter is usually placed in either of those places
		let counter = entity.entityCounter;
		if (counter === undefined && entity.counter) {
			counter = entity.counters.entityCounter;
		}
		counter = 0;
		if (counter > maxEntityCounter) {
			maxEntityCounter = counter;
		}
	});
	return {
		pending: false,
		maxEntityCounter,
		byId,
		ids,
	};
}

// same but we don't care about the previous state
export function setEntities(entities: Array<any>) {
	const ids = [];
	const byId = {};
	let maxEntityCounter;
	// CUSTOM FIELDS: deep copy is used here in order to add custom fields
	// we can remove when x- is added in the backend
	entities = deepCopy(entities);
	entities.forEach(entity => {
		ids.push(entity.id);
		addCustomFields(entity);
		byId[entity.id] = entity;
		// the counter is usually placed in either of those places
		maxEntityCounter = entity.entityCounter || entity.counters.entityCounter;
	});
	return {
		pending: false,
		maxEntityCounter,
		byId,
		ids,
	};
}

function addCustomFields(entity) {
	if (entity.additionalInfo && entity.additionalInfo.customFields) {
		const cf = entity.additionalInfo.customFields;
		Object.entries(cf).forEach(([k, v]) => entity['x-' + k] = v.value);
	}
}

export const entityStateToArray = (entityState: EntityState<any>): Array<any> => {
	const returned = [];
	entityState.ids.forEach(id => {
		returned.push(entityState.byId[id]);
	});
	return returned;
};

export const entityInitialState: EntityState<any> = {
	pending: true,
	maxEntityCounter: 0,
	byId : {},
	ids: []
};

export function copyById(state, id, additionalProps?: any) {
	return {
		...state,
		byId: {
			...state.byId,
			[id]: {
				// returning deep copy of the product since it should
				// be inexpensive and it simplifies everything
				...deepCopy(state.byId[id]),
				...additionalProps
			}
		}
	};
}
