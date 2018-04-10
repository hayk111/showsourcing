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
import { DialogHeaderComponent } from './containers/dialog-header/dialog-header.component';
import { DialogSubtitleComponent } from './containers/dialog-subtitle/dialog-subtitle.component';
import { DialogFooterComponent } from './containers/dialog-footer/dialog-footer.component';


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
		ConfirmDialogComponent,
		DialogHeaderComponent,
		DialogSubtitleComponent,
		DialogFooterComponent
	],
	entryComponents: [ConfirmDialogComponent],
	exports: [
		DialogComponent,
		DialogContainerComponent,
		DialogHeaderComponent,
		DialogSubtitleComponent,
		DialogFooterComponent
	]
})
export class DialogModule {

}
