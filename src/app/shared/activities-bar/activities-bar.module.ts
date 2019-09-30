import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesBarComponent } from '~shared/activities-bar/activities-bar.component';
import { RatingModule } from '~shared/rating';
import { IconsModule } from '~shared/icons';



@NgModule({
	imports: [
		CommonModule,
		RatingModule,
		IconsModule
	],
	declarations: [
		ActivitiesBarComponent
	],
	exports: [ActivitiesBarComponent]
})
export class ActivitiesBarModule { }
