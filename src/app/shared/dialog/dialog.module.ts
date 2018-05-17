import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~app/shared/icons';
import { UtilsModule } from '~shared/utils/utils.module';

import { ConfirmDialogComponent } from './containers/confirm-dialog/confirm-dialog.component';
import { DialogContainerComponent } from './containers/dialog-container/dialog-container.component';
import { DialogComponent } from './containers/dialog/dialog.component';
import { DialogHostDirective } from '~app/shared/dialog/components/dialog-host.directive';
import { DialogModalComponent } from '~app/shared/dialog/components/dialog-modal/dialog-modal.component';
import { DialogHeaderComponent } from '~app/shared/dialog/components/dialog-header/dialog-header.component';
import { DialogFooterComponent } from '~app/shared/dialog/components/dialog-footer/dialog-footer.component';
import { DialogSubtitleComponent } from '~app/shared/dialog/components/dialog-subtitle/dialog-subtitle.component';


@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
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
