import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import { HeaderComponent, NotifComponent, UserPanelComponent } from './components';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';

@NgModule({
	imports: [
		SharedModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		ContextMenuModule
	],
	declarations: [HeaderComponent, NotifComponent, UserPanelComponent],
	exports: [HeaderComponent],
})
export class HeaderModule { }
