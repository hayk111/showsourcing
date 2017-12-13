import { userReducer } from './user.reducer';
import { authenticationReducer } from './authentication.reducer';
import { companyReducer } from './company.reducer';
import { countryReducer } from './country.reducer';
import { currencyReducer } from './currency.reducer';
import { categoryReducer } from './category.reducer';
import { teamsReducer } from './team.reducer';
import { eventsReducer } from './event.reducer';
import { tagReducer } from './tag.reducer';
import { projectReducer } from './project.reducer';
import { filtersReducer } from './filter.reducer';
import { filterPanelReducer } from './filter-panel.reducer';
import { filterSelectionPanelReducer } from './filter-selection-panel.reducer';
import { supplierReducer } from './supplier.reducer';
import { taskReducer } from './task.reducer';
import { productReducer } from './product.reducer';
import { viewSwitcherReducer } from './view-switcher.reducer';
import { miscReducer } from './misc.reducer';
import { productStatusReducer } from './product-status.reducer';
import { tasksStatusReducer } from './task-status.reducer';
import { tasksTypeReducer } from './task-type.reducer';
import { ActionReducer, State, ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store/src/utils';
import { environment } from '../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { customFieldsReducer } from './custom-fields.reducer';
import { dialogReducer } from './dialog.reducer';
import { InjectionToken } from '@angular/core';
import { teamMembersReducer } from './team-members.reducer';
import { commentReducer } from './comment.reducer';
import { filesReducer } from './files.reducer';


const entities = combineReducers({
	user: userReducer,
	// company: companyReducer,
	countries: countryReducer,
	currencies: currencyReducer,
	categories: categoryReducer,
	teams: teamsReducer,
	events: eventsReducer,
	tags: tagReducer,
	projects: projectReducer,
	suppliers: supplierReducer,
	teamMembers: teamMembersReducer,
	tasks: taskReducer,
	products: productReducer,
	// status might change from user to user in the future ?
	productStatus: productStatusReducer,
	tasksStatus: tasksStatusReducer,
	tasksType: tasksTypeReducer,
	customFields: customFieldsReducer,
	comments: commentReducer,
	files: filesReducer
});

const ui = combineReducers( {
	authentication: authenticationReducer,
	filters: filtersReducer,
	filterPanel: filterPanelReducer,
	filterSelectionPanel: filterSelectionPanelReducer,
	dialogs: dialogReducer,
	viewSwitcher: viewSwitcherReducer
});

export const reducers = { entities, ui };
// This is because an error is thrown that the value cannot be resolved because combineReducer is used.

export const reducerToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export const reducerProvider = [
	{ provide: reducerToken, useValue: reducers }
];
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
			error: (error: any, prevState: Object) => 'red'
		}
	})(reducer);
}

export const metaReducers = environment.production ? [] : [logger, storeFreeze];
