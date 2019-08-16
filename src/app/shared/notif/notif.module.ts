import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons/icons.module';
import { UtilsModule } from '~shared/utils';
import { DividerModule } from '~shared/divider/divider.module';
import {
	NotifComponent,
	NotifEmptyComponent,
	NameQueryComponent,
	NotifHeaderComponent,
	NotifItemComponent,
	NotifLayoutComponent,
	NotifListComponent,
	NotifPanelComponent
} from '~shared/notif/components';

@NgModule({
	imports: [CommonModule, IconsModule, UtilsModule, DividerModule],

	declarations: [
		NotifComponent,
		NotifEmptyComponent,
		NameQueryComponent,
		NotifHeaderComponent,
		NotifLayoutComponent,
		NotifItemComponent,
		NotifPanelComponent,
		NotifListComponent],
	exports: [NotifComponent],
	providers: [],
})
export class NotifModule { }
