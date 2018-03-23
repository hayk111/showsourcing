import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, State } from '@ngrx/store';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { authDlgReducer, authenticationReducer } from '~auth';
import { commentReducer } from '~comment';
import { dialogReducer } from '~dialog';
import { imageReducer } from '~features/file/store';
import { productReducer } from '~products/store';
import { projectsReducer } from '~projects';
import { supplierReducer } from '~suppliers';
import { taskReducer } from '~tasks';
import { userReducer } from '~user';

import { filterEntityPanelReducer } from '../../../shared/filters/store/reducers/filter-entity-panel.reducer';
import { filterPanelReducer } from '../../../shared/filters/store/reducers/filter-panel.reducer';
import { filtersReducer } from '../../../shared/filters/store/reducers/filter.reducer';
import {
	categoryActionTypes,
	countryActionTypes,
	currencyActionTypes,
	customFieldsActionTypes,
	tagActionTypes,
	teamActionTypes,
	teamMembersActionTypes,
	incoTermsActionTypes,
	harbourActionTypes,
} from '../action/entities';
import { basicReducerFactory } from '../../../shared/entity/store/basic-entity.reducer.factory';
import { productStatusReducer } from './entities/product-status.reducer';
import { tasksStatusReducer } from './entities/task-status.reducer';
import { tasksTypeReducer } from './entities/task-type.reducer';
import { currentTargetReducer } from './target/target.reducer';
import { fileReducer } from '~app/features/file';
import { eventReducer } from '~app/features/events';

const entities = combineReducers({
	user: userReducer,
	teams: basicReducerFactory(teamActionTypes),
	teamMembers: basicReducerFactory(teamMembersActionTypes),
	countries: basicReducerFactory(countryActionTypes),
	incoTerms: basicReducerFactory(incoTermsActionTypes),
	harbours: basicReducerFactory(harbourActionTypes),
	currencies: basicReducerFactory(currencyActionTypes),
	categories: basicReducerFactory(categoryActionTypes),
	events: eventReducer,
	tags: basicReducerFactory(tagActionTypes),
	suppliers: supplierReducer,
	products: productReducer,
	productStatus: productStatusReducer,
	projects: projectsReducer,
	tasks: taskReducer,
	tasksStatus: tasksStatusReducer,
	taskTypes: tasksTypeReducer,
	customFields: basicReducerFactory(customFieldsActionTypes),
	files: fileReducer,
	images: imageReducer,
	comments: commentReducer,
});

const misc = combineReducers({
	authentication: authenticationReducer,
	filters: filtersReducer,
});

const foccussedEntity = combineReducers({
	currentTarget: currentTargetReducer,
});

const ui = combineReducers({
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	filterEntityPanel: filterEntityPanelReducer,
});

export const reducers: ActionReducerMap<any> = { entities, foccussedEntity, misc, ui };
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

// Generate a reducer to set the root state in dev mode for HMR
export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
	return function(state: any, action: any) {
		if (action.type === 'SET_ROOT_STATE') {
			return action.payload;
		}
		return reducer(state, action);
	};
}

export const metaReducers = environment.production ? [] : [stateSetter, logger, storeFreeze];
