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
	providers: [],
	declarations: [],
	exports: [],
})
export class UserModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: UserModule,
			providers: []
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: UserModule,
		};
	}

}
