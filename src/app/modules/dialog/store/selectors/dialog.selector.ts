import { DialogName } from '../../models/dialog-names.enum';
import { createSelector } from 'reselect';

export const selectDialogs = state => state.ui.dialogs;

export const selectDialog = (dialogName: DialogName | string) => {
	return createSelector([selectDialogs], dialogs => dialogs[dialogName]);
};
