import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EntityModule } from '~app/entity/entity.module';

import { UserService } from './services';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { SharedModule } from '~app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		EntityPagesModule
	],
	providers: [UserService],
	declarations: [UserSettingsComponent],
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
