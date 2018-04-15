import { createEntitySelectors } from '~app/entity/store/entity-bundle';
import { ERM } from '~app/entity/store/entity.model';
import { createSelector } from '@ngrx/store';
import { FilterGroupName, Filter } from '~app/shared/filters/models';
import { fromCountry } from '~app/entity/store/country';
import { fromTeamMember } from '~app/entity/store/team-member';
import { Supplier } from './supplier.model';
import { selectFilterGroup } from '~app/shared/filters/store/selectors/filter.selectors';


const baseSelectors = createEntitySelectors(ERM.supplier.entityName);

/** selector for the list of suppliers in @ supplier/all */
const selectSupplierList = createSelector(
	[
		baseSelectors.selectState,
		selectFilterGroup(FilterGroupName.SUPPLIERS_PAGE),
		fromCountry.selectById,
		fromTeamMember.selectById
	],
	(supplierState: any, filters, countryById, memberById) => {
		const returned = [];
		// let's try to do only one loop over the supplier array
		supplierState.ids.forEach(id => {
			const supplier = { ...supplierState.byId[id] };
			// we don't add if it does not pass filtering
			if (!passesFilter(supplier, filters))
				return;
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

// adding selector to supplier selectors.
export const supplierSelectors = {
	...baseSelectors,
	selectSupplierList
};

function passesFilter(supplier: Supplier, filters) {
	for (const filter of filters) {
		switch (filter.type) {
			case 'search': if (!supplier.name.includes(filter.value)) return false;
		}
	}
	return true;
}

