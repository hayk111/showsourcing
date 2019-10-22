import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { BannerTaskComponent } from './task-preview';





@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		TaskPreviewComponent,
		BannerTaskComponent
	],
	exports: [
		TaskPreviewComponent
	],
	entryComponents: []
})
export class PreviewsCommonModule { }
