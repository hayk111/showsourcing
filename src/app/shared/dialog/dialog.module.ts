import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils/utils.module';

import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogContainerComponent } from '~shared/dialog/containers/dialog-container/dialog-container.component';
import { DialogComponent } from '~shared/dialog/containers/dialog/dialog.component';
import { DialogHostDirective } from '~shared/dialog/components/dialog-host.directive';
import { DialogModalComponent } from '~shared/dialog/components/dialog-modal/dialog-modal.component';
import { DialogHeaderComponent } from '~shared/dialog/components/dialog-header/dialog-header.component';
import { DialogFooterComponent } from '~shared/dialog/components/dialog-footer/dialog-footer.component';
import { DialogSubtitleComponent } from '~shared/dialog/components/dialog-subtitle/dialog-subtitle.component';
import { A11yModule } from '@angular/cdk/a11y';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		A11yModule,
		TranslateModule
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
