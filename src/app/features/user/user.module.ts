import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';


import { UserService } from './services';
import { SharedModule } from '~shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		TopPanelModule
	],
	providers: [UserService],
	declarations: [],
	exports: [],
})
export class UserModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: UserModule,
			providers: [UserService]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: UserModule,
		};
	}

}
