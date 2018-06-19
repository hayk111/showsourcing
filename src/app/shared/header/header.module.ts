import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { SearchBarAnimatedModule } from '~shared/search-bar-animated/search-bar-animated.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import { HeaderComponent, NotifComponent, UserPanelComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		SearchBarAnimatedModule,
		RouterModule.forChild([]),
		UserPictureModule,
		ContextMenuModule
	],
	declarations: [HeaderComponent, NotifComponent, UserPanelComponent],
	exports: [HeaderComponent],
})
export class HeaderModule { }
