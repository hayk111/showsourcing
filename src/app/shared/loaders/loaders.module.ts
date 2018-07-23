import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '~shared/loaders/components/spinner/spinner.component';
import { ProgressBarComponent } from '~shared/loaders/components/progress-bar/progress-bar.component';


// spinners, progress bar..
@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [ SpinnerComponent, ProgressBarComponent ],
	exports: [ SpinnerComponent, ProgressBarComponent ]
})
export class LoadersModule { }
