import { userReducer } from './entities/user.reducer';
import { authenticationReducer } from './misc/authentication.reducer';
import { countryReducer } from './entities/country.reducer';
import { currencyReducer } from './entities/currency.reducer';
import { categoryReducer } from './entities/category.reducer';
import { teamsReducer } from './entities/team.reducer';
import { eventsReducer } from './entities/event.reducer';
import { tagReducer } from './entities/tag.reducer';
import { projectReducer } from './entities/project.reducer';
import { filtersReducer } from './entities/filter.reducer';
import { filterPanelReducer } from './ui/filter-panel.reducer';
import { supplierReducer } from './entities/supplier.reducer';
import { taskReducer } from './entities/task.reducer';
import { productReducer } from './entities/product.reducer';
import { viewSwitcherReducer } from './ui/view-switcher.reducer';
import { productStatusReducer } from './entities/product-status.reducer';
import { tasksStatusReducer } from './entities/task-status.reducer';
import { tasksTypeReducer } from './entities/task-type.reducer';
import { ActionReducer, State, ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store/src/utils';
import { environment } from '../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { customFieldsReducer } from './entities/custom-fields.reducer';
import { dialogReducer } from './ui/dialog.reducer';
import { InjectionToken } from '@angular/core';
import { teamMembersReducer } from './entities/team-members.reducer';
import { sidenavReducer } from './ui/sidenav.reducer';
import { commentReducer } from './target/comment.reducer';
import { filesReducer } from './target/files.reducer';
import { imagesReducer } from './target/image.reducer';
import { voteReducer } from './target/vote.reducer';
import { targetTagReducer } from './target/tag.reducer';
import { targetProjectReducer } from './target/project.reducer';
import { filterEntityPanelReducer } from './ui/filter-entity-panel.reducer';
import { authDlgReducer } from './ui/auth-dlg.reducer';


const entities = combineReducers({
	user: userReducer,
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
});

const misc = combineReducers({
	authentication: authenticationReducer,
	filters: filtersReducer,
});

const ui = combineReducers( {
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	viewSwitcher: viewSwitcherReducer,
	sideNav: sidenavReducer,
	filterEntityPanel: filterEntityPanelReducer,
});

// reducers for when we select a specific entity. Like when we are viewing a certain product
const target = combineReducers({
	projects: targetProjectReducer,
	tags: targetTagReducer,
	comments: commentReducer,
	files: filesReducer,
	images: imagesReducer,
	votes: voteReducer
});


export const reducers = { entities, target, ui, misc };
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

export const metaReducers = environment.production ? [] : [
 logger, storeFreeze
];
