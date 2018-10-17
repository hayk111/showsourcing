import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputsModule } from '~shared/inputs/inputs.module';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { UtilsModule } from '~shared/utils';
import { ImageModule } from '~shared/image/image.module';
import { UserPictureModule } from '~shared/user-picture';
import { IconsModule } from '~shared/icons';

const components = [
	SelectorComponent,
	SelectorEntityComponent,
	SelectorConstComponent,
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
		IconsModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
