import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '~app/shared/icons';
import { LoadersModule } from '~app/shared/loaders';
import { UtilsModule } from '~app/shared/utils';
import { CardModule } from '~app/shared/card';
import { EntityModule } from '~app/entity';
import { InputsModule } from '~app/shared/inputs';

// those modules are used so commonly that we will just import the shared module

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		LoadersModule,
		UtilsModule,
		CardModule,
		InputsModule,
		EntityModule.forChild()
	],
	declarations: [],
	exports: [
		CommonModule,
		IconsModule,
		LoadersModule,
		UtilsModule,
		CardModule,
		InputsModule,
		EntityModule
	]
})
export class SharedModule { }
