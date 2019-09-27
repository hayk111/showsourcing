import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import {
	SampleBoardPageComponent,
	SampleCardComponent,
	SampleComponent,
	SamplePreviewComponent,
	SampleTableComponent,
} from './components';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		CommentCommonModule
	],
	declarations: [
		SampleComponent,
		SampleTableComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleBoardPageComponent,
	],
	exports: [
		SampleComponent,
		SampleTableComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleBoardPageComponent,
	],
	entryComponents: []
})
export class SampleCommonModule { }
