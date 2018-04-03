import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './containers/dialog/dialog.component';
import { UtilsModule } from '~shared/utils/utils.module';
import { DialogContainerComponent } from './containers/dialog-container/dialog-container.component';
import { DialogHostDirective } from './containers/dialog-host.directive';
import { StoreModule } from '@ngrx/store';
import { dialogReducer } from '~app/shared/dialog/store/dialog.reducer';
import { IconsModule } from '~app/shared/icons';


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
		DialogHostDirective
	],
	exports: [
		DialogComponent,
		DialogContainerComponent
	]
})
export class DialogModule {

}
