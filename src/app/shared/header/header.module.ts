import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppStoreModule } from '~store/store.module';

import { UserModule } from '~features/user';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { HeaderComponent } from './components';
import { NotifComponent } from './components';
import { SearchComponent } from './components';
import { UserInfoComponent } from './components';
import { UserPanelComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		AppStoreModule,
		RouterModule.forChild([]),
		UserModule.forChild(),
		IconsModule,
	],
	declarations: [HeaderComponent, NotifComponent, SearchComponent, UserInfoComponent, UserPanelComponent],
	exports: [HeaderComponent],
})
export class HeaderModule {}
