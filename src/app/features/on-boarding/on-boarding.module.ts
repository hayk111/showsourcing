import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FindBusinessComponent } from './components';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [FindBusinessComponent, WelcomeComponent]
})
export class OnBoardingModule { }
