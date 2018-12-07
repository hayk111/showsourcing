import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
	PreviewCarouselComponent,
	PreviewComponent,
	PreviewHeaderComponent,
	PreviewLogoComponent,
	PreviewSectionComponent,
} from './components';
import { OverlayModule } from '@angular/cdk/overlay';


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
		OverlayModule
	],
	declarations: [
		PreviewComponent,
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewLogoComponent,
		PreviewCarouselComponent
	],
	exports: [
		PreviewComponent,
		PreviewHeaderComponent,
		PreviewSectionComponent,
		PreviewBadgesComponent,
		PreviewBannerComponent,
		PreviewLogoComponent,
		PreviewCarouselComponent
	]
})
export class PreviewModule { }
