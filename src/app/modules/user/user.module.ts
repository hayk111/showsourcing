import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared/user/services/user.service';
import { AppStoreModule } from '../store/store.module';
import { UserPictureComponent } from './components/user-picture/user-picture.component';
import { UserPictureWithNameComponent } from './components/user-picture-with-name/user-picture-with-name.component';

@NgModule({
	imports: [
		CommonModule,
		AppStoreModule.forChild()
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

	static forRoot(): ModuleWithProviders {
	  return {

    };
  }
}
