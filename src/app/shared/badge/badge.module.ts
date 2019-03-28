import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { BadgeComponent, StatusBadgeComponent, StatusBoxComponent, InfoBadgeComponent, RequestBadgeComponent } from './components';


@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule
	],
	declarations: [
		BadgeComponent,
		InfoBadgeComponent,
		RequestBadgeComponent,
		StatusBadgeComponent,
		StatusBoxComponent,
	],
	exports: [
		BadgeComponent,
		InfoBadgeComponent,
		RequestBadgeComponent,
		StatusBadgeComponent,
		StatusBoxComponent,
	],
})
export class BadgeModule { }
