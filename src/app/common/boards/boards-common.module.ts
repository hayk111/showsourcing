import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SampleBoardPageComponent } from './sample-board/sample-board.component';


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		SampleBoardPageComponent,
	],
	exports: [
		SampleBoardPageComponent,
	],
	entryComponents: []
})
export class BoardsCommonModule { }
