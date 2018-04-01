import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EntityModule } from '~entity/entity.module';

import { UserPictureComponent } from './components';
import { UserService } from './services';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';

@NgModule({
	imports: [CommonModule, EntityModule.forChild()],
	providers: [UserService],
	declarations: [UserPictureComponent, UserSettingsComponent],
	exports: [UserPictureComponent],
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
