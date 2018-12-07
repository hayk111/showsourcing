import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
	PreviewBadgesComponent,
	PreviewBannerComponent,
	PreviewComponent,
	PreviewHeaderComponent,
	PreviewSectionComponent,
} from './components';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import { EditableFieldModule } from '~shared/editable-field';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { PreviewLogoComponent } from './components/preview-logo/preview-logo.component';
import { ImageModule } from '~shared/image/image.module';
import { PreviewCarouselComponent } from './components/preview-carousel/preview-carousel.component';
import { CarouselModule } from '~shared/carousel';


@NgModule({
	imports: [
		CommonModule,
		StatusSelectorModule,
		FormsModule,
		IconsModule,
		EditableFieldModule,
		SelectorsModule,
		ImageModule,
		CarouselModule
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
