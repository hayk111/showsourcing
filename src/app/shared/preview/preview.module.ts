import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
	PreviewBadgesComponent,
	PreviewBannerComponent,
	PreviewComponent,
	PreviewHeaderComponent,
	PreviewSectionComponent,
} from './components';
import { SharedModule } from '~shared/shared.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { FormsModule } from '@angular/forms';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		WorkflowActionModule,
		FormsModule
	],
	declarations: [
		PreviewComponent,
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent
	],
	exports: [
		PreviewComponent,
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent
	]
})
export class PreviewModule { }
