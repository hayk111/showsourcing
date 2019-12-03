import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge';
import { CarouselModule } from '~shared/carousel';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { LogoModule } from '~shared/logo';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { UtilsModule } from '~shared/utils';

import {
	PreviewBannerComponent,
	PreviewCarouselComponent,
	PreviewCommentComponent,
	PreviewHeaderComponent,
	PreviewPanelComponent,
	PreviewSectionComponent,
	PreviewStaticComponent,
	PreviewTabComponent,
	PreviewTopBarComponent,
} from './components';


@NgModule({
	imports: [
		BadgeModule,
		CarouselModule,
		CommonModule,
		ContextMenuModule,
		EditableFieldModule,
		FileModule,
		FormsModule,
		IconsModule,
		ImageModule,
		LogoModule,
		OverlayModule,
		ReactiveFormsModule,
		SelectorsModule,
		StatusSelectorModule,
		TranslateModule,
		UtilsModule,
	],
	declarations: [
		PreviewBannerComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewHeaderComponent,
		PreviewPanelComponent,
		PreviewSectionComponent,
		PreviewStaticComponent,
		PreviewTabComponent,
		PreviewTopBarComponent,
	],
	exports: [
		PreviewBannerComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewHeaderComponent,
		PreviewPanelComponent,
		PreviewSectionComponent,
		PreviewStaticComponent,
		PreviewTabComponent,
		PreviewTopBarComponent,
	]
})
export class PreviewModule { }
