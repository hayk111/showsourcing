import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './containers/dialog/dialog.component';
import { UtilsModule } from '../shared/utils/utils.module';


@NgModule({
	imports: [
		CommonModule,
		UtilsModule
	],
	declarations: [ DialogComponent ],
	exports: [ DialogComponent ]
})
export class DialogModule {

}
