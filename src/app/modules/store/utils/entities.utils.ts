import { CustomFieldsName } from '../reducer/entities/custom-fields.reducer';
import { uuid } from './uuid.utils';
import { SupplierActions } from '../action/entities/supplier.action';
import { EventActions } from '../action/entities/event.action';
import { CategoryActions } from '../action/entities/category.action';
import { TagActions } from '../action/entities/tag.action';
import { ProjectActions } from '../action/entities/project.action';
import { ProductActions } from '../action/entities/product.action';
import { TaskActions } from '../action/entities/task.action';
import { CurrencyActions } from '../action/entities/currency.action';
import { TeamMembersActions } from '../action/entities/team-members.action';
import { CommentSlctnActions } from '../action/selection/comment-selection.action';
import { FileSlctnActions } from '../action/selection/file-selection.action';
import { ImageSlctnActions } from '../action/selection/images-selection.action';

export const entityInitialState: EntityState<any> = {
	pending: true,
	byId : {},
	ids: []
};

export interface EntityState<G extends Entity> {
	pending: boolean;
	byId: { [key: string]: G };
	ids: Array<string>;
}

export class Entity {
	id: string;
	name: string;
	createdByUserId?: string;
	creationDate?: number;

	constructor(userId: string) {
		this.id = uuid();
		this.creationDate = Date.now();
		this.createdByUserId = userId;
	}
}

export class EntityRepresentation  {
	constructor(public entityName: string,
							public actions?: any,
							public urlName?: string,
							public displayName?: string,
							public descriptorName?: CustomFieldsName | string) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
		this.descriptorName = descriptorName || entityName + 'CFDef';
	}
}

export const entityRepresentationMap = {
	suppliers: new EntityRepresentation('suppliers', SupplierActions),
	events: new EntityRepresentation('events', EventActions),
	categories: new EntityRepresentation('categories', CategoryActions, 'category'),
	tags: new EntityRepresentation('tags', TagActions),
	projects: new EntityRepresentation('projects', ProjectActions),
	product: new EntityRepresentation('products', ProductActions),
	tasks: new EntityRepresentation('tasks', TaskActions),
	// no need to specify actions for those
	productStatus: new EntityRepresentation('productStatus', undefined, 'status', 'status'),
	currencies: new EntityRepresentation('currencies', undefined),
	teamMembers: new EntityRepresentation('teamMembers', undefined),
	comments: new EntityRepresentation('comments', undefined),
	files: new EntityRepresentation('files', undefined),
	images: new EntityRepresentation('images', undefined)
};

export interface EntityTarget {
	entityId?: string;
	entityRepr: EntityRepresentation;
}

// since the response we receive is an array we have to loop
// through every thing in order to normalize our data.
// https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export function addEntities(state: any, entities: Array<any>) {
	const ids = [...state.ids];
	const byId = { ...state.byId };
	entities.forEach(entity => {
		ids.push(entity.id);
		byId[entity.id] = entity;
	});
	return {
		pending: false,
		byId,
		ids,
	};
}

export function replaceEntity(state: any, old: Entity, replacing: Entity) {
	const oldId = old.id;
	const replacingId = replacing.id;
	const oldIdIndex = state.ids.indexOf(old.id);
	// if index found replace id in ids and Enitity in byId
	if (~oldIdIndex) {
		const ids = [...state.ids];
		const byId = { ...state.byId };
		ids[oldIdIndex] = replacing.id;
		delete byId[oldId];
		byId[replacing.id] = replacing;
		return {
			...state,
			ids,
			byId
		};
	}
	// if not found do nothing
	return state;
}

export const entityStateToArray = (entityState: EntityState<any>): Array<any> => {
	const returned = [];
	entityState.ids.forEach(id => {
		returned.push(entityState.byId[id]);
	});
	return returned;
};

export function copyById(state, id, additionalProps?: any) {
	return {
		...state,
		byId: {
			...state.byId,
			[id]: {
				...state.byId[id],
				...additionalProps
			}
		}
	};
}

export function removeId(state, id) {
	const ids = [...state.ids];
	const index = ids.indexOf(id);
	ids.splice(index, 1);

	const byId = { ...state.byId };
	delete byId[id];
	return {
		...state,
		byId,
		ids
	};
}
