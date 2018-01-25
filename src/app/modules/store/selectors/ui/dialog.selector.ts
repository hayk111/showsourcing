import { createSelector } from 'reselect';
import { DialogName } from '../../model/ui/dialog.model';

export const selectDialogs = state => state.ui.dialogs;

export const selectDialog = (dialogName: DialogName | string) => {
	return createSelector([selectDialogs], dialogs => dialogs[dialogName]);
};
