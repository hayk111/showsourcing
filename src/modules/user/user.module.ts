import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AppStoreModule } from '~store/store.module';
import { UserService } from '~user/services';

import { UserPictureWithNameComponent } from './components';
import { UserPictureComponent } from './components';
import { effects } from '~user/store';

@NgModule({
	imports: [CommonModule, AppStoreModule.forChild(), EffectsModule.forFeature(effects)],
	providers: [UserService],
	declarations: [UserPictureComponent, UserPictureWithNameComponent],
	exports: [UserPictureComponent, UserPictureWithNameComponent],
})
export class UserModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: UserModule,
			providers: [ UserService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: UserModule,
		};
	}

}
