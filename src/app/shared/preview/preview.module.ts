import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from '~shared/carousel';
import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { UtilsModule } from '~shared/utils';
import { TranslateModule } from '@ngx-translate/core';

import {
	PreviewBadgesComponent,
	PreviewBannerComponent,
	PreviewCommentComponent,
	PreviewHeaderComponent,
	PreviewSectionComponent,
	PreviewLogoComponent,
	PreviewCarouselComponent,
	PreviewTabComponent,
	PreviewPanelComponent,
	PreviewStaticComponent,
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
		TranslateModule
	],
	declarations: [
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewLogoComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewTabComponent,
		PreviewStaticComponent,
		PreviewPanelComponent
	],
	exports: [
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewLogoComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewTabComponent,
		PreviewStaticComponent,
		PreviewPanelComponent
	]
})
export class PreviewModule { }
