import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivitiesBarComponent } from '~shared/activities-bar/activities-bar.component';
import { BadgeModule } from '~shared/badge';
import { IconsModule } from '~shared/icons';
import { RatingModule } from '~shared/rating';
import { UtilsModule } from '~shared/utils';



@NgModule({
	imports: [
		CommonModule,
		RatingModule,
		IconsModule,
		UtilsModule,
		BadgeModule
	],
	declarations: [
		ActivitiesBarComponent
	],
	exports: [ActivitiesBarComponent]
})
export class ActivitiesBarModule { }
