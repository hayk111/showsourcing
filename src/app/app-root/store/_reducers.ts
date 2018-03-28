import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, State } from '@ngrx/store';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { authDlgReducer, authenticationReducer } from '~auth';
import { dialogReducer } from '~dialog';
import {
	userReducer, teamReducer, teamMemberReducer, countryReducer, incoTermReducer,
	harbourReducer, currencyReducer, categoryReducer, eventReducer, tagReducer, supplierReducer,
	productReducer, productStatusReducer, taskStatusReducer, taskTypeReducer, supplierStatusReducer, projectsReducer,
	taskReducer, customFieldReducer, fileReducer, imageReducer, commentReducer, focussedEntityReducer
} from '~app/entity';
import { filtersReducer, filterPanelReducer, filterEntityPanelReducer } from '~app/shared/filters';

const entities = combineReducers({
	user: userReducer,
	teams: teamReducer,
	teamMembers: teamMemberReducer,
	countries: countryReducer,
	incoTerms: incoTermReducer,
	harbours: harbourReducer,
	currencies: currencyReducer,
	categories: categoryReducer,
	events: eventReducer,
	tags: tagReducer,
	supplier: supplierReducer,
	products: productReducer,

	productStatus: productStatusReducer,
	tasksStatus: taskStatusReducer,
	taskTypes: taskTypeReducer,
	supplierStatus: supplierStatusReducer,
	projects: projectsReducer,
	tasks: taskReducer,
	customFields: customFieldReducer,
	files: fileReducer,
	images: imageReducer,
	comments: commentReducer,
});

const misc = combineReducers({
	authentication: authenticationReducer,
	filters: filtersReducer,
});

const ui = combineReducers({
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	filterEntityPanel: filterEntityPanelReducer,
});

export const reducers: ActionReducerMap<any> = { entities, focussedEntity: focussedEntityReducer, misc, ui };
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
	return function (state: any, action: any) {
		if (action.type === 'SET_ROOT_STATE') {
			return action.payload;
		}
		return reducer(state, action);
	};
}

export const metaReducers = environment.production ? [] : [stateSetter, logger, storeFreeze];
