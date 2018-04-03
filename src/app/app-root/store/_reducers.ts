import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, State } from '@ngrx/store';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { filterEntityPanelReducer, filterPanelReducer, filtersReducer } from '~app/shared/filters/store/reducers';
import { dialogReducer } from '~dialog';
import {
	userReducer, teamReducer, fromCountry, teamMemberReducer, incoTermReducer, harbourReducer, fromCurrency,
	fromCategory, fromEvent, tagReducer, supplierReducer, productReducer, productStatusReducer, taskStatusReducer,
	taskTypeReducer, supplierStatusReducer, projectReducer, taskReducer, fromCustomField, fromFile, imageReducer,
	fromComment, focussedEntityReducer
} from '~app/entity';



const misc = combineReducers({
	filters: filtersReducer,
});

const entities = combineReducers({
	user: userReducer,
	team: teamReducer,
	teamMember: teamMemberReducer,
	country: fromCountry.reducer,
	incoTerm: incoTermReducer,
	harbour: harbourReducer,
	currency: fromCurrency.reducer,
	category: fromCategory.reducer,
	event: fromEvent.reducer,
	tag: tagReducer,
	supplier: supplierReducer,
	product: productReducer,

	productStatus: productStatusReducer,
	taskStatus: taskStatusReducer,
	taskType: taskTypeReducer,
	supplierStatus: supplierStatusReducer,
	project: projectReducer,
	task: taskReducer,
	customField: fromCustomField.reducer,
	file: fromFile.reducer,
	image: imageReducer,
	comment: fromComment.reducer,
});

const ui = combineReducers({
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
