import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';


import { SharedModule } from '~shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		TopPanelModule
	],
	declarations: [],
	exports: [],
})
export class UserModule {


}
