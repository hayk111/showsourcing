import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';

import {
	BadgeComponent,
	InfoBadgeComponent,
	RequestStatusBadgeComponent,
	StatusBadgeComponent,
	StatusBoxComponent,
	TaskStatusBadgeComponent,
} from './components';


@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule
	],
	declarations: [
		BadgeComponent,
		InfoBadgeComponent,
		RequestStatusBadgeComponent,
		StatusBadgeComponent,
		StatusBoxComponent,
		TaskStatusBadgeComponent,
	],
	exports: [
		BadgeComponent,
		InfoBadgeComponent,
		RequestStatusBadgeComponent,
		StatusBadgeComponent,
		StatusBoxComponent,
		TaskStatusBadgeComponent,
	],
})
export class BadgeModule { }
