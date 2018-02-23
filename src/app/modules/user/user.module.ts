import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@modules/user';
import { AppStoreModule } from '../store/store.module';
import { UserPictureComponent } from './components/user-picture/user-picture.component';
import { UserPictureWithNameComponent } from './components/user-picture-with-name/user-picture-with-name.component';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '@modules/user';

@NgModule({
	imports: [
		CommonModule,
		AppStoreModule.forChild(),
		EffectsModule.forFeature(effects),
	],
	providers: [ UserService ],
	declarations: [ UserPictureComponent, UserPictureWithNameComponent ],
	exports: [ UserPictureComponent, UserPictureWithNameComponent ]
})
export class UserModule {
	static forChild(): ModuleWithProviders {
		return {
			ngModule: UserModule
		};
	}

}
