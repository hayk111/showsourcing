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

import {
	PreviewBadgesComponent,
	PreviewBannerComponent,
	PreviewComponent,
	PreviewHeaderComponent,
	PreviewSectionComponent,
	PreviewCommentComponent
} from './components';
import { PreviewLogoComponent } from './components/preview-logo/preview-logo.component';
import { PreviewCarouselComponent } from './components/preview-carousel/preview-carousel.component';


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
	],
	declarations: [
		PreviewComponent,
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewLogoComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
	],
	exports: [
		PreviewComponent,
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewLogoComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
	]
})
export class PreviewModule { }
