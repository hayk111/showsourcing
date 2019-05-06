import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnBoardingDlgComponent } from './components/on-boarding-dlg/on-boarding-dlg.component';
import { ImageModule } from '~shared/image/image.module';
import { DialogModule } from '~shared/dialog';

@NgModule({
	declarations: [OnBoardingDlgComponent],
	imports: [
		CommonModule,
		ImageModule,
		DialogModule
	],
	exports: [OnBoardingDlgComponent],
	entryComponents: [OnBoardingDlgComponent]
})
export class OnBoardingModule { }
