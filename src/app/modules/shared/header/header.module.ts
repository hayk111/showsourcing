import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotifComponent } from './components/notif/notif.component';
import { SearchComponent } from './components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { UtilsModule } from '../utils/utils.module';
import { AppStoreModule } from '../../store/store.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		AppStoreModule
	],
	declarations: [ HeaderComponent, NotifComponent, SearchComponent, UserInfoComponent, UserPanelComponent],
	exports: [ HeaderComponent ]
})
export class HeaderModule { }
