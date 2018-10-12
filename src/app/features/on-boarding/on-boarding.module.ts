import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FindBusinessComponent } from './components';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { OnBoardingPageComponent } from './containers';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [OnBoardingPageComponent, FindBusinessComponent, WelcomeComponent]
})
export class OnBoardingModule { }
