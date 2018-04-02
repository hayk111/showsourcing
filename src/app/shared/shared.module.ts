import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '~app/shared/icons';
import { LoadersModule } from '~app/shared/loaders';
import { UtilsModule } from '~app/shared/utils';
import { CardModule } from '~app/shared/card';
import { EntityModule } from '~app/entity';
import { InputsModule } from '~app/shared/inputs';
import { PriceModule } from '~app/shared/price';
import { EditableFieldModule } from '~app/shared/editable-field';
import { UserPictureModule } from '~app/shared/user-picture';

// those modules are used so commonly that we will just import the shared module
const modules = [
	CommonModule,
	IconsModule,
	LoadersModule,
	UtilsModule,
	CardModule,
	InputsModule,
	EntityModule,
	PriceModule,
	EditableFieldModule,
	UserPictureModule
];

@NgModule({
	imports: modules,
	declarations: [],
	exports: modules
})
export class SharedModule { }
