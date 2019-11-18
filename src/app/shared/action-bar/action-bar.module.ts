import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from '~shared/action-bar/action-bar.component';
import { RatingModule } from '~shared/rating';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		RatingModule,
		IconsModule
	],
	declarations: [
		ActionBarComponent
	],
	exports: [ActionBarComponent]
})
export class ActionBarModule { }
