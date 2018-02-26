import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AppStoreModule } from '~store/store.module';
import { effects, UserService } from '~user';

import { UserPictureWithNameComponent } from './components';
import { UserPictureComponent } from './components/user-picture/user-picture.component';

@NgModule({
	imports: [CommonModule, AppStoreModule.forChild(), EffectsModule.forFeature(effects)],
	providers: [UserService],
	declarations: [UserPictureComponent, UserPictureWithNameComponent],
	exports: [UserPictureComponent, UserPictureWithNameComponent],
})
export class UserModule {
	static forChild(): ModuleWithProviders {
		return {
			ngModule: UserModule,
		};
	}
}
