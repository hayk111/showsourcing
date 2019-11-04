import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from '~shared/carousel';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { UtilsModule } from '~shared/utils';

import {
	PreviewBadgesComponent,
	PreviewBannerComponent,
	PreviewCarouselComponent,
	PreviewCommentComponent,
	PreviewHeaderComponent,
	PreviewLogoComponent,
	PreviewPanelComponent,
	PreviewSectionComponent,
	PreviewStaticComponent,
	PreviewTabComponent,
	PreviewTopBarComponent,
} from './components';


@NgModule({
	imports: [
		CommonModule,
		StatusSelectorModule,
		FormsModule,
		IconsModule,
		EditableFieldModule,
		SelectorsModule,
		ImageModule,
		CarouselModule,
		FileModule,
		OverlayModule,
		ReactiveFormsModule,
		UtilsModule,
		TranslateModule,
		ContextMenuModule
	],
	declarations: [
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewHeaderComponent,
		PreviewLogoComponent,
		PreviewPanelComponent,
		PreviewSectionComponent,
		PreviewStaticComponent,
		PreviewTabComponent,
		PreviewTopBarComponent,
	],
	exports: [
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewHeaderComponent,
		PreviewLogoComponent,
		PreviewPanelComponent,
		PreviewSectionComponent,
		PreviewStaticComponent,
		PreviewTabComponent,
		PreviewTopBarComponent,
	]
})
export class PreviewModule { }
