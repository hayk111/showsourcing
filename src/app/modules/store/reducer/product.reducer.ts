import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/product.action';
import { Product } from '../model/product.model';
import { EntityState, entityInitialState, setEntities, copyById, addEntities } from '../utils/entities.utils';
import { deepCopy } from '../utils/deep-copy.utils';
import { AppComment } from '../model/comment.model';
import { AppFile } from '../model/app-file.model';
import { Tag } from '../model/tag.model';
import { Project } from '../model/project.model';



export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<any> )
: EntityState<Product> {
	let id;
	let tags;
	let projects;

	switch (action.type) {

		case ActionType.SET:
			return setEntities(action.payload);

		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		case ActionType.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		case ActionType.SET_TAGS:
			tags = action.payload.tags.map(t => t.id);
			id = action.payload.id;
			return copyById(state, id, {tags});

		case ActionType.ADD_TAG:
			const tagId = action.payload.tag.id;
			id = action.payload.id;
			const currentTags = state.byId[id].tags || [];
			tags = [...currentTags, tagId ];
			return copyById(state, id, {tags});

		case ActionType.SET_PROJECTS:
			projects = action.payload.projects.map(p => p.id);
			id = action.payload.id;
			return copyById(state, id, {projects});

		case ActionType.ADD_PROJECT:
			const projectsId = action.payload.project.id;
			id = action.payload.id;
			const currentProjects =  state.byId[id].projects || [];
			projects = [...currentProjects, projectsId];
			return copyById(state, id, {projects});

		default: return state;
	}
}

