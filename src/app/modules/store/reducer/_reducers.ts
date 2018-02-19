
import { ActionReducer, State, ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { userReducer } from './entities/user.reducer';
import { countryReducer } from './entities/country.reducer';
import { currencyReducer } from './entities/currency.reducer';
import { teamMembersReducer } from './entities/team-members.reducer';
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
import { currentTargetReducer, targetReducerFactory } from './target/target.reducer';
import { ActionType as VoteSlctnActionTypes } from '../action/target/vote.action';
import { ActionType as TaskSlctnActionTypes } from '../action/target/task.action';
import { ActionType as ProjectSlctnActionTypes } from '../action/target/project.action';
import { ActionType as TagSlctnActionTypes } from '../action/target/tag-selection.action';
import { ActionType as FileSlctnActionTypes } from '../action/target/file.action';
import { ActionType as ImageSltcnActionTypes } from '../action/target/images.action';
import { ActionType as CommentSltcnActionTypes } from '../action/target/comment.action';
import { imageSelectionReducer } from './target/image-target.reducer';
import { basicReducerFactory } from './entities/basic-entity.reducer.factory';
import { entityRepresentationMap } from '../utils/entities.utils';
import { CategoryActionTypes } from '../action/entities/index';
import { EventActionTypes as EventActionTypes } from '../action/entities/index';
import { TagActionTypes } from '../action/entities/index';
import { SupplierActionTypes } from '../action/entities/index';
import { ProductActionTypes } from '../action/entities/index';
import { ProjectActionTypes } from '../action/entities/index';
import { TaskActionTypes } from '../action/entities/index';
import { TeamActionTypes } from '../action/entities/index';
import { productSelectionReducer } from './ui/product-selection.reducer';

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
	currentSelection: currentTargetReducer,
	projects: targetReducerFactory(ProjectSlctnActionTypes),
	tags: targetReducerFactory(TagSlctnActionTypes),
	tasks: targetReducerFactory(TaskSlctnActionTypes),
	comments: targetReducerFactory(CommentSltcnActionTypes),
	files: targetReducerFactory(FileSlctnActionTypes),
	images: imageSelectionReducer,
	votes: targetReducerFactory(VoteSlctnActionTypes)
});

const ui = combineReducers( {
	authDlg: authDlgReducer,
	filterPanel: filterPanelReducer,
	dialogs: dialogReducer,
	viewSwitcher: viewSwitcherReducer,
	sideNav: sidenavReducer,
	filterEntityPanel: filterEntityPanelReducer,
	productSelection: productSelectionReducer
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
