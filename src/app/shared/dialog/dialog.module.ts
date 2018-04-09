import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { dialogReducer } from '~app/shared/dialog/store/dialog.reducer';
import { IconsModule } from '~app/shared/icons';
import { UtilsModule } from '~shared/utils/utils.module';

import { ConfirmDialogComponent } from './containers/confirm-dialog/confirm-dialog.component';
import { DialogContainerComponent } from './containers/dialog-container/dialog-container.component';
import { DialogHostDirective } from './containers/dialog-host.directive';
import { DialogModalComponent } from './containers/dialog-modal/dialog-modal.component';
import { DialogComponent } from './containers/dialog/dialog.component';


@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		StoreModule.forFeature('dialog', dialogReducer)
	],
	declarations: [
		DialogComponent,
		DialogContainerComponent,
		DialogHostDirective,
		DialogModalComponent,
		ConfirmDialogComponent
	],
	entryComponents: [ConfirmDialogComponent],
	exports: [
		DialogComponent,
		DialogContainerComponent
	]
})
export class DialogModule {

}
