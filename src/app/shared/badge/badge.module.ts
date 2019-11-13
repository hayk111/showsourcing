import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';

import {
	BadgeComponent,
	InfoBadgeComponent,
	NotificationBadgeDirective,
	RatingBadgeComponent,
	RequestStatusBadgeComponent,
	StatusBadgeComponent,
	StatusBoxComponent,
	TaskStatusBadgeComponent,
} from './components';


@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule,
		TranslateModule,
	],
	declarations: [
		BadgeComponent,
		InfoBadgeComponent,
		NotificationBadgeDirective,
		RequestStatusBadgeComponent,
		StatusBadgeComponent,
		StatusBoxComponent,
		TaskStatusBadgeComponent,
		RatingBadgeComponent,
	],
	exports: [
		BadgeComponent,
		InfoBadgeComponent,
		NotificationBadgeDirective,
		RequestStatusBadgeComponent,
		StatusBadgeComponent,
		StatusBoxComponent,
		TaskStatusBadgeComponent,
		RatingBadgeComponent,
	],
	entryComponents: []
})
export class BadgeModule { }
