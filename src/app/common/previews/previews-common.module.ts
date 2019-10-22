import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SamplePreviewComponent } from './sample-preview/sample-preview.component';
import { BannerTaskComponent } from './task-preview';
import { TaskPreviewComponent } from './task-preview/task-preview.component';


@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
	],
	declarations: [
		SamplePreviewComponent,
		TaskPreviewComponent,
		BannerTaskComponent
	],
	exports: [
		SamplePreviewComponent,
		TaskPreviewComponent
	],
	entryComponents: []
})
export class PreviewsCommonModule { }
