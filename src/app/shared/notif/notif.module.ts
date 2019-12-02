import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from '~shared/card/card.module';
import { DividerModule } from '~shared/divider/divider.module';
import { IconsModule } from '~shared/icons/icons.module';
import { LoadersModule } from '~shared/loaders';
import { LogoModule } from '~shared/logo';
import {
	NotifBoxComponent,
	NotifComponent,
	NotifEmptyComponent,
	NotifItemComponent,
	NotifLayoutComponent,
	NotifListComponent,
	NotifPanelComponent,
} from '~shared/notif/components';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule,
		DividerModule,
		CardModule,
		LoadersModule,
		LogoModule,
		TranslateModule
	],
	declarations: [
		NotifComponent,
		NotifEmptyComponent,
		NotifLayoutComponent,
		NotifItemComponent,
		NotifPanelComponent,
		NotifListComponent,
		NotifBoxComponent
	],
	exports: [
		NotifComponent,
		NotifBoxComponent
	],
	providers: [],
})
export class NotifModule { }
