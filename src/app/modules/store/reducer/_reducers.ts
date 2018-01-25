
import { ActionReducer, State, ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store/src/utils';
import { environment } from '../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { CurrentTargetAction } from '../action/target/current-target.action';
import { userReducer } from './entities/user.reducer';
import { countryReducer } from './entities/country.reducer';
import { currencyReducer } from './entities/currency.reducer';
import { categoryReducer } from './entities/category.reducer';
import { teamsReducer } from './entities/team.reducer';
import { eventsReducer } from './entities/event.reducer';
import { tagReducer } from './entities/tag.reducer';
import { projectReducer } from './entities/project.reducer';
import { supplierReducer } from './entities/supplier.reducer';
import { teamMembersReducer } from './entities/team-members.reducer';
import { productReducer } from './entities/product.reducer';
import { taskReducer } from './entities/task.reducer';
import { productStatusReducer } from './entities/product-status.reducer';
import { tasksTypeReducer } from './entities/task-type.reducer';
import { customFieldsReducer } from './entities/custom-fields.reducer';
import { commentReducer } from './entities/comment.reducer';
import { filesReducer } from './entities/files.reducer';
import { voteReducer } from './entities/vote.reducer';
import { imagesReducer } from './entities/image.reducer';
import { tasksStatusReducer } from './entities/task-status.reducer';
import { dialogReducer } from './ui/dialog.reducer';
import { filtersReducer } from './misc/filter.reducer';
import { authDlgReducer } from './ui/auth-dlg.reducer';
import { authenticationReducer } from './misc/authentication.reducer';
import { viewSwitcherReducer } from './ui/view-switcher.reducer';
import { filterPanelReducer } from './ui/filter-panel.reducer';
import { sidenavReducer } from './ui/sidenav.reducer';
import { filterEntityPanelReducer } from './ui/filter-entity-panel.reducer';
import { InjectionToken } from '@angular/core';
import { currentTargetReducer } from './target/current-target.reducer';


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
	files: filesReducer,
	images: imagesReducer,
	votes: voteReducer
});

const misc = combineReducers({
	authentication: authenticationReducer,
	filters: filtersReducer,

});

const target = combineReducers({
	currentTarget: currentTargetReducer
});

const ui = combineReducers( {
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	viewSwitcher: viewSwitcherReducer,
	sideNav: sidenavReducer,
	filterEntityPanel: filterEntityPanelReducer,
});


export const reducers = { entities, target, misc, ui };
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
