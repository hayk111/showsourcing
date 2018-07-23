import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '~shared/card';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DividerModule } from '~shared/divider/divider.module';
import { EditableFieldModule } from '~shared/editable-field';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { ListModule } from '~shared/list/list.module';
import { LoadersModule } from '~shared/loaders';
import { MoqModule } from '~shared/moq';
import { PanelModule } from '~shared/panel/panel.module';
import { PriceModule } from '~shared/price';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { BadgeModule } from '~shared/badge';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

// those modules are used so commonly that we will just import the shared module
const modules = [
	CommonModule,
	IconsModule,
	LoadersModule,
	UtilsModule,
	CardModule,
	InputsModule,
	SelectorsModule,
	PriceModule,
	MoqModule,
	EditableFieldModule,
	UserPictureModule,
	ListModule,
	DividerModule,
	ReactiveFormsModule,
	PanelModule,
	ImageModule,
	ContextMenuModule,
	BadgeModule,
	ImageModule
];

@NgModule({
	imports: modules,
	declarations: [],
	exports: modules
})
export class SharedModule { }
