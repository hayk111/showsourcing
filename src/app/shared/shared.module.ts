import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { UtilsModule } from '~shared/utils';
import { CardModule } from '~shared/card';
import { InputsModule } from '~shared/inputs';
import { PriceModule } from '~shared/price';
import { MoqModule } from '~shared/moq';
import { EditableFieldModule } from '~shared/editable-field';
import { UserPictureModule } from '~shared/user-picture';
import { ListModule } from '~shared/list/list.module';
import { DividerModule } from '~shared/divider/divider.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidePanelComponent } from '~shared/panel/component/side-panel/side-panel.component';
import { PanelModule } from '~shared/panel/panel.module';

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
	PanelModule
];

@NgModule({
	imports: modules,
	declarations: [],
	exports: modules
})
export class SharedModule { }
