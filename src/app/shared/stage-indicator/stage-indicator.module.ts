import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StageIndicatorComponent } from '~shared/stage-indicator/stage-indicator.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [StageIndicatorComponent],
	exports: [StageIndicatorComponent]
})
export class StageIndicatorModule { }
