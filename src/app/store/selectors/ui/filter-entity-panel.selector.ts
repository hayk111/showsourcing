import { createSelector } from 'reselect';


export const selectFEP = (state) => state.ui.filterEntityPanel;

export const selectFEPChoices = createSelector([selectFEP], (fep) => {
	const choices =  fep.choices || [];
	// if the search string is empty we return every thing
	if (!fep.search)
		return choices;
	// else we return things that start with the search.
	return choices.filter(c => c.name.startsWith(fep.search));
});

export const selectFEPRelevant = createSelector([selectFEP], (fep) => {
	return fep.relevant || [];
});