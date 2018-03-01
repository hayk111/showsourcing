import { createSelector } from 'reselect';


export const selectFilterPanel = state => state.ui.filterPanel;

export const selectFilterPanelOpen = createSelector([selectFilterPanel], panel => panel.open);


