import { createSelector } from 'reselect';


export const selectFilterSelectionPanel = state => state.ui.filterSelectionPanel;


export const selectFilterSelectionPanelOpen = createSelector([selectFilterSelectionPanel], panel => panel.open);

export const selectFilterSelectionPanelTarget = createSelector([selectFilterSelectionPanel], panel => panel.target);
