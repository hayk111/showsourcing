import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FindBusinessComponent } from './components';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [FindBusinessComponent, WelcomeComponent]
})
export class OnBoardingModule { }
