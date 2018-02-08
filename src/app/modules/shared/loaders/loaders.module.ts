import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [ SpinnerComponent, ProgressBarComponent ],
	exports: [ SpinnerComponent, ProgressBarComponent ]
})
export class LoadersModule { }
