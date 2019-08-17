import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons/icons.module';
import { UtilsModule } from '~shared/utils';
import { DividerModule } from '~shared/divider/divider.module';
import {
	NotifComponent,
	NotifEmptyComponent,
	NotifHeaderComponent,
	NotifItemComponent,
	NotifLayoutComponent,
	NotifListComponent,
	NotifPanelComponent,
	NotifBoxComponent
} from '~shared/notif/components';

@NgModule({
	imports: [CommonModule, IconsModule, UtilsModule, DividerModule],

	declarations: [
		NotifComponent,
		NotifEmptyComponent,
		NotifHeaderComponent,
		NotifLayoutComponent,
		NotifItemComponent,
		NotifPanelComponent,
		NotifListComponent,
		NotifBoxComponent
	],
	exports: [NotifComponent, NotifBoxComponent],
	providers: [],
})
export class NotifModule { }
