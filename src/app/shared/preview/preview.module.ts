import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge';
import { CarouselModule } from '~shared/carousel';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DividerModule } from '~shared/divider/divider.module';
import { EditableModule } from '~shared/editable';
import { FileModule } from '~shared/file';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { LogoModule } from '~shared/logo';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { UtilsModule } from '~shared/utils';

import {
	PreviewActionsComponent,
	PreviewBannerComponent,
	PreviewCarouselComponent,
	PreviewCommentComponent,
	PreviewHeaderButtonsComponent,
	PreviewHeaderComponent,
	PreviewHeaderSubtitleComponent,
	PreviewPanelComponent,
	PreviewSectionActionComponent,
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
		EditableModule,
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
		DividerModule
	],
	declarations: [
		PreviewActionsComponent,
		PreviewBannerComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewHeaderButtonsComponent,
		PreviewHeaderComponent,
		PreviewHeaderSubtitleComponent,
		PreviewPanelComponent,
		PreviewSectionActionComponent,
		PreviewSectionComponent,
		PreviewStaticComponent,
		PreviewTabComponent,
		PreviewTopBarComponent,
	],
	exports: [
		PreviewActionsComponent,
		PreviewBannerComponent,
		PreviewCarouselComponent,
		PreviewCommentComponent,
		PreviewHeaderButtonsComponent,
		PreviewHeaderComponent,
		PreviewHeaderSubtitleComponent,
		PreviewPanelComponent,
		PreviewSectionActionComponent,
		PreviewSectionComponent,
		PreviewStaticComponent,
		PreviewTabComponent,
		PreviewTopBarComponent,
	]
})
export class PreviewModule { }
