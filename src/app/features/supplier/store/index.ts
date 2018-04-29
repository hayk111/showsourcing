import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contacts/contact.reducer';
import * as fromLatestProduct from './latest-product/latest-product.reducer';
import * as fromNewSupplierDialog from './new-supplier-dlg/new-supplier-dlg.reducer';
import * as fromSupplierList from './supplier-list/supplier-list.bundle';
import * as fromSupplierDetails from './supplier-details/supplier-details.reducer';
import { selectEntityState, EntityState, fromCountry, fromTeamMember, fromSupplier } from '~app/entity';

export * from './contacts/contact.actions';
export * from './latest-product/latest-product.action';

// defining the state
export interface SupplierState {
	latestProduct: fromLatestProduct.State;
	contact: fromContact.State;
	newSupplierDialog: fromNewSupplierDialog.State;
	supplierList: fromSupplierList.State;
	supplierDetails: fromSupplierDetails.State;
}

export const reducers: ActionReducerMap<SupplierState> = {
	latestProduct: fromLatestProduct.reducer,
	contact: fromContact.reducer,
	newSupplierDialog: fromNewSupplierDialog.reducer,
	supplierList: fromSupplierList.reducer,
	supplierDetails: fromSupplierDetails.reducer
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

// supplier details
const selectFocusedId = createSelector(selectSupplierState, (state: SupplierState) => state.supplierDetails.focused);
export const selectFocusedSupplier = createSelector(selectFocusedId, fromSupplier.selectById, (id, byId: any) => byId[id]);

// supplier list
export const selectSupplierListState = createSelector(
	selectSupplierState, (state: SupplierState) => state.supplierList
);


export const selectSupplierList = createSelector(
	selectSupplierListState,
	(state: any) => state.entities.supplier,
	(state: any) => state.entities.country.byId,
	(state: any) => state.entities.teamMember.byId,
	(supplierListState: fromSupplierList.State, supplierState: EntityState<any>, countryById, memberById) => {
		const returned = [];
		supplierListState.ids.forEach(id => {
			const supplier = { ...supplierState.byId[id] };
			// adding countryName
			if (countryById && supplier.countryCode && countryById[supplier.countryCode])
				supplier.countryName = countryById[supplier.countryCode].fullName;
			// adding createdBy and createdByName. Created by user id is always present on supplier
			if (memberById && memberById[supplier.createdByUserId])
				supplier.createdBy = memberById[supplier.createdByUserId];
			// adding product count
			supplier.productCount = supplierState.productCount[supplier.id] || 0;

			returned.push(supplier);
		});
		return returned;
	}
);
