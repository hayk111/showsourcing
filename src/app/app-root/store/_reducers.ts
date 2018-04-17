import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, State } from '@ngrx/store';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import {
	focussedEntityReducer,
	productReducer,
	userReducer,
	fromProject,
	fromSupplier,
	fromCategory,
	fromComment,
	fromCountry,
	fromCurrency,
	fromCustomField,
	fromEvent,
	fromFile,
	fromHarbour,
	fromImage,
	fromIncoTerm,
	fromProductStatus,
	fromSupplierStatus,
	fromTag,
	fromTask,
	fromTaskStatus,
	fromTaskType,
	fromTeamMember,
	fromTeam,
} from '~app/entity';
import { filterPanelReducer, filtersReducer } from '~app/shared/filters/store/reducers';
import { fromSupplierProduct } from '~app/features/supplier/store/product/product.bundle';
import { fromSupplierContact } from '~app/features/supplier/store/contacts/contact.bundle';
import { fromStateKey } from '~app/features/state-key/state-key.bundle';
import { fromSupplierDialog } from '~app/features/supplier/store/new-supplier-dlg/new-supplier-dlg.bundle';



const entities = combineReducers({
	user: userReducer,
	team: fromTeam.reducer,
	teamMember: fromTeamMember.reducer,
	country: fromCountry.reducer,
	incoTerm: fromIncoTerm.reducer,
	harbour: fromHarbour.reducer,
	currency: fromCurrency.reducer,
	category: fromCategory.reducer,
	event: fromEvent.reducer,
	tag: fromTag.reducer,
	supplier: fromSupplier.reducer,
	product: productReducer,

	productStatus: fromProductStatus.reducer,
	taskStatus: fromTaskStatus.reducer,
	taskType: fromTaskType.reducer,
	supplierStatus: fromSupplierStatus.reducer,
	project: fromProject.reducer,
	task: fromTask.reducer,
	customField: fromCustomField.reducer,
	file: fromFile.reducer,
	image: fromImage.reducer,
	comment: fromComment.reducer,
});

// TODO should be in feature
const supplier = combineReducers({
	product: fromSupplierProduct.reducer,
	contact: fromSupplierContact.reducer,
	newSupplierDlg: fromSupplierDialog.reducer
});

const ui = combineReducers({
	filterPanel: filterPanelReducer,
});

export const reducers: ActionReducerMap<any> = {
	entities,
	focussedEntity: focussedEntityReducer,
	supplier,
	filters: filtersReducer
};
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
