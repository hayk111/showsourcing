import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
	PreviewBadgesComponent,
	PreviewBannerComponent,
	PreviewComponent,
	PreviewHeaderComponent,
	PreviewSectionComponent,
} from './components';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import { EditableFieldModule } from '~shared/editable-field';
import { SelectorsModule } from '~shared/selectors/selectors.module';


@NgModule({
	imports: [
		CommonModule,
		WorkflowActionModule,
		FormsModule,
		IconsModule,
		EditableFieldModule,
		SelectorsModule
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
