import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EntityModule } from '~entity/entity.module';

import { UserPictureWithNameComponent } from './components';
import { UserPictureComponent } from './components';
import { UserService } from './services';

@NgModule({
	imports: [CommonModule, EntityModule.forChild()],
	providers: [UserService],
	declarations: [UserPictureComponent, UserPictureWithNameComponent],
	exports: [UserPictureComponent, UserPictureWithNameComponent],
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
