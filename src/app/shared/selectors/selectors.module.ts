import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { UserPictureModule } from '~shared/user-picture';

import { CdkOverlayComponent, SelectorComponent } from './components';
import { SelectorConstComponent } from './components/selector-const/selector-const.component';
import { SelectorEntityComponent } from './components/selector-entity/selector-entity.component';


const components = [
	SelectorComponent,
	SelectorEntityComponent,
	SelectorConstComponent,
	CdkOverlayComponent
];

@NgModule({
	imports: [
		CommonModule,
		NgSelectModule,
		ReactiveFormsModule,
		FormsModule,
		InputsModule,
		ImageModule, // pipes are used
		UserPictureModule,
		IconsModule,
		OverlayModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
