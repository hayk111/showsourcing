import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityModule } from '~app/entity';

import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { HeaderComponent } from './components';
import { NotifComponent } from './components';
import { UserInfoComponent } from './components';
import { UserPanelComponent } from './components';
import { UserModule } from '~app/features/user';
import { SharedModule } from '~app/shared/shared.module';
import { SearchBarAnimatedModule } from '~app/shared/search-bar-animated/search-bar-animated.module';
import { UserPictureModule } from '~app/shared/user-picture';

@NgModule({
	imports: [
		SharedModule,
		SearchBarAnimatedModule,
		RouterModule.forChild([]),
		UserPictureModule
	],
	declarations: [HeaderComponent, NotifComponent, UserInfoComponent, UserPanelComponent],
	exports: [HeaderComponent],
})
export class HeaderModule { }
