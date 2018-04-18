import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contacts/contact.reducer';
import * as fromLatestProduct from './latest-product/latest-product.reducer';
import * as fromNewSupplierDialog from './new-supplier-dlg/new-supplier-dlg.reducer';
import * as fromSupplierList from './supplier-list/supplier-list.bundle';

export * from './contacts/contact.actions';
export * from './latest-product/latest-product.action';

// defining the state
export interface SupplierState {
	latestProduct: fromLatestProduct.State;
	contact: fromContact.State;
	newSupplierDialog: fromNewSupplierDialog.State;
	supplierList: fromSupplierList.State;
}

export const reducers: ActionReducerMap<SupplierState> = {
	latestProduct: fromLatestProduct.reducer,
	contact: fromContact.reducer,
	newSupplierDialog: fromNewSupplierDialog.reducer,
	supplierList: fromSupplierList.reducer
};

// feature selector

export const selectSupplierState = createFeatureSelector<SupplierState>('supplier');

// latest products
const selectLatestProducts = createSelector(
	selectSupplierState,
	(state: SupplierState) => state.latestProduct
);

export const selectLatestProductsArray = createSelector(selectLatestProducts, fromLatestProduct.selectAll);

// contacts
const selectContacts = createSelector(
	selectSupplierState,
	(state: SupplierState) => state.contact
);

export const selectContactArray = createSelector(selectContacts, fromContact.selectAll);
export const selectContactPreviewImg = createSelector(selectContacts, fromContact.selectPreview);
export const selectContactOne = (id) => createSelector(selectContacts, fromContact.selectOne(id));
// new supplierDlg
const selectNewSupplierDialog = createSelector(
	selectSupplierState,
	(state: SupplierState) => state.newSupplierDialog
);

export const selectNewSupplierDialogPending = createSelector(selectNewSupplierDialog, fromNewSupplierDialog.selectPending);

// supplier list

export const selectSupplierList = createSelector(
	selectSupplierState,
	(state: SupplierState) => state.supplierList
);


