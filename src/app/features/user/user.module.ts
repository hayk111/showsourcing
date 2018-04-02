import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EntityModule } from '~entity/entity.module';

import { UserService } from './services';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { SharedModule } from '~app/shared/shared.module';

@NgModule({
	imports: [SharedModule],
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
