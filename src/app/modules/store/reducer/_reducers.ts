
import { ActionReducer, State, ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { userReducer } from './entities/user.reducer';
import { countryReducer } from './entities/country.reducer';
import { currencyReducer } from './entities/currency.reducer';
import { teamsReducer } from './entities/team.reducer';
import { teamMembersReducer } from './entities/team-members.reducer';
import { productReducer } from './entities/product.reducer';
import { productStatusReducer } from './entities/product-status.reducer';
import { tasksTypeReducer } from './entities/task-type.reducer';
import { customFieldsReducer } from './entities/custom-fields.reducer';
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
import { currentSelectionReducer, selectionReducerFactory } from './selection/selection.reducer';
import { ActionType as VoteSlctnActionTypes } from '../action/selection/vote-selection.action';
import { ActionType as TaskSlctnActionTypes } from '../action/selection/task-selection.action';
import { ActionType as ProjectSlctnActionTypes } from '../action/selection/project-selection.action';
import { ActionType as TagSlctnActionTypes } from '../action/selection/tag-selection.action';
import { ActionType as FileSlctnActionTypes } from '../action/selection/file-selection.action';
import { ActionType as ImageSltcnActionTypes } from '../action/selection/images-selection.action';
import { ActionType as CommentSltcnActionTypes } from '../action/selection/comment-selection.action';
import { imageSelectionReducer } from './selection/image-selection.reducer';
import { basicReducerFactory } from './entities/basic-entity.reducer.factory';
import { entityRepresentationMap } from '../utils/entities.utils';
import { categoryReducer } from './entities/category.reducer';
import { eventsReducer } from './entities/event.reducer';
import { tagReducer } from './entities/tag.reducer';
import { projectReducer } from './entities/project.reducer';
import { supplierReducer } from './entities/supplier.reducer';
import { taskReducer } from './entities/task.reducer';
import { ActionType as CategoryActionTypes } from '../action/entities/category.action';
import { ActionType as EventActionTypes } from '../action/entities/event.action';
import { ActionType as TagActionTypes } from '../action/entities/tag.action';
import { ActionType as SupplierActionTypes } from '../action/entities/supplier.action';
import { ActionType as ProductActionTypes } from '../action/entities/product.action';
import { ActionType as ProjectActionTypes } from '../action/entities/project.action';
import { ActionType as TaskActionTypes } from '../action/entities/task.action';
import { ActionType as TeamActionTypes } from '../action/entities/team.action';

const entities = combineReducers({
	user: userReducer,
	teams:  basicReducerFactory(TeamActionTypes),
	teamMembers: teamMembersReducer,
	countries: countryReducer,
	currencies: currencyReducer,
	categories: basicReducerFactory(CategoryActionTypes),
	events: basicReducerFactory(EventActionTypes),
	tags: basicReducerFactory(TagActionTypes),
	projects: basicReducerFactory(ProjectActionTypes),
	suppliers: basicReducerFactory(SupplierActionTypes),

	tasks: basicReducerFactory(TaskActionTypes),
	tasksStatus: tasksStatusReducer,
	taskTypes: tasksTypeReducer,
	products: basicReducerFactory(ProductActionTypes),
	productStatus: productStatusReducer,
	customFields: customFieldsReducer
});

const misc = combineReducers({
	authentication: authenticationReducer,
	filters: filtersReducer,
});

const selection = combineReducers({
	currentSelection: currentSelectionReducer,
	projects: selectionReducerFactory(ProjectSlctnActionTypes),
	tags: selectionReducerFactory(TagSlctnActionTypes),
	tasks: selectionReducerFactory(TaskSlctnActionTypes),
	comments: selectionReducerFactory(CommentSltcnActionTypes),
	files: selectionReducerFactory(FileSlctnActionTypes),
	images: imageSelectionReducer,
	votes: selectionReducerFactory(VoteSlctnActionTypes)
});

const ui = combineReducers( {
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	viewSwitcher: viewSwitcherReducer,
	sideNav: sidenavReducer,
	filterEntityPanel: filterEntityPanelReducer,
});


export const reducers = { entities, selection, misc, ui };
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
