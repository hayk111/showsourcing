import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { BadgeModule } from '~shared/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	HeaderComponent,
	HeaderSearchComponent,
	NotifComponent,
	UserPanelComponent,
	NotifHeaderComponent,
	NotifListComponent,
	NotifItemComponent,
	NotifPanelComponent,
	NotifLayoutComponent,
	NotifEmptyComponent,
	NameQueryComponent
} from './components';

@NgModule({
	imports: [
		SharedModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		SearchAutocompleteModule,
		ActivityCommonModule,
		BadgeModule,
		BrowserAnimationsModule
	],
	declarations: [
		HeaderComponent,
		NotifComponent,
		UserPanelComponent,
		HeaderSearchComponent,
		NotifHeaderComponent,
		NotifItemComponent,
		NotifPanelComponent,
		NotifLayoutComponent,
		NotifListComponent,
		NotifEmptyComponent,
		NameQueryComponent
	],
	exports: [HeaderComponent]
})
export class HeaderModule {}
