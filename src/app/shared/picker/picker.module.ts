import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';

import { PickerAreaComponent } from './components/picker-area/picker-area.component';
import { PickerHostDirective } from './components/picker-host.directive';
import { PickerContainerComponent } from './containers';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
	],
	declarations: [
		PickerContainerComponent,
		PickerHostDirective,
		PickerAreaComponent
	],
	exports: [
		PickerContainerComponent
	]
})
export class PickerModule {

}
