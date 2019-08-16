import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { BadgeModule } from '~shared/badge';
import { UtilsModule } from '~shared/utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	NotifComponent,
	NotifHeaderComponent,
	NotifListComponent,
	NotifItemComponent,
	NotifPanelComponent,
	NotifLayoutComponent,
	NotifEmptyComponent,
	NameQueryComponent
} from './';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ActivityCommonModule,
		BadgeModule,
		BrowserAnimationsModule,
		UtilsModule
	],
	declarations: [
		NotifComponent,
		NotifHeaderComponent,
		NotifItemComponent,
		NotifPanelComponent,
		NotifLayoutComponent,
		NotifListComponent,
		NotifEmptyComponent,
		NameQueryComponent
	],
	exports: [NotifComponent]
})
export class NotifModule {}
