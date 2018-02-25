import { productReducer } from './../../products/store/reducers/product.reducer';
import { ActionReducer, State, ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { userReducer } from '~user';
import { productStatusReducer } from './entities/product-status.reducer';
import { tasksTypeReducer } from './entities/task-type.reducer';
import { tasksStatusReducer } from './entities/task-status.reducer';
import { dialogReducer } from '~dialog';
import { filtersReducer } from './misc/filter.reducer';
import { authDlgReducer } from './ui/auth-dlg.reducer';
import { authenticationReducer } from './misc/authentication.reducer';
import { viewSwitcherReducer } from './ui/view-switcher.reducer';
import { filterPanelReducer } from './ui/filter-panel.reducer';
import { filterEntityPanelReducer } from './ui/filter-entity-panel.reducer';
import { InjectionToken } from '@angular/core';
import { currentTargetReducer, targetReducerFactory } from './target/target.reducer';
import { ActionType as VoteSlctnActionTypes } from '../action/target/vote.action';
import { ActionType as TaskSlctnActionTypes } from '../action/target/task.action';
import { ActionType as ProjectSlctnActionTypes } from '../action/target/project.action';
import { ActionType as TagSlctnActionTypes } from '../action/target/tag-selection.action';
import { ActionType as FileSlctnActionTypes } from '../action/target/file.action';
import { imageSelectionReducer } from './target/image-target.reducer';
import { basicReducerFactory } from './entities/basic-entity.reducer.factory';
import {
	CategoryActionTypes,
	CountryActionTypes,
	CurrencyActionTypes,
	CustomFieldsActionTypes,
	TeamMembersActionTypes,
} from '../action/entities/index';
import { EventActionTypes } from '../action/entities/index';
import { TagActionTypes } from '../action/entities/index';
import { TeamActionTypes } from '../action/entities/index';
import { commentReducer } from '~comment';
import { projectReducer } from '~projects';
import { supplierReducer } from '~suppliers';
import { taskReducer } from '~tasks';

const entities = combineReducers({
	user: userReducer,
	teams: basicReducerFactory(TeamActionTypes),
	teamMembers: basicReducerFactory(TeamMembersActionTypes),
	countries: basicReducerFactory(CountryActionTypes),
	currencies: basicReducerFactory(CurrencyActionTypes),
	categories: basicReducerFactory(CategoryActionTypes),
	events: basicReducerFactory(EventActionTypes),
	tags: basicReducerFactory(TagActionTypes),
	projects: projectReducer,
	suppliers: supplierReducer,
	products: productReducer,
	productStatus: productStatusReducer,
	tasks: taskReducer,
	tasksStatus: tasksStatusReducer,
	taskTypes: tasksTypeReducer,
	customFields: basicReducerFactory(CustomFieldsActionTypes),
});

const misc = combineReducers({
	authentication: authenticationReducer,
	filters: filtersReducer,
});

const foccussedEntity = combineReducers({
	currentTarget: currentTargetReducer,
	projects: targetReducerFactory(ProjectSlctnActionTypes),
	tags: targetReducerFactory(TagSlctnActionTypes),
	tasks: targetReducerFactory(TaskSlctnActionTypes),
	comments: commentReducer,
	files: targetReducerFactory(FileSlctnActionTypes),
	images: imageSelectionReducer,
	votes: targetReducerFactory(VoteSlctnActionTypes),
});

const ui = combineReducers({
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	viewSwitcher: viewSwitcherReducer,
  filterEntityPanel: filterEntityPanelReducer,
});

export const reducers = { entities, foccussedEntity, misc, ui };
// This is because an error is thrown that the value cannot be resolved because combineReducer is used.

export const reducerToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export const reducerProvider = [{ provide: reducerToken, useValue: reducers }];
// end of fix

export function logger(reducer: ActionReducer<State<any>>): any {
	// default, no options
	return storeLogger({
		collapsed: true,
		colors: {
			title: (action: Object) => '#0a83a7',
			prevState: (prevState: Object) => '#1ea306',
			action: (action: Object) => '#0a83a7',
			nextState: (nextState: Object) => '#5e2bd9',
			error: (error: any, prevState: Object) => 'red',
		},
	})(reducer);
}

export const metaReducers = environment.production ? [] : [logger, storeFreeze];
