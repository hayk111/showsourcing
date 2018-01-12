import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilsModule } from '../utils/utils.module';


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
