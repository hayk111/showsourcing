import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';

import { PortalAreaComponent } from './components/portal-area/portal-area.component';
import { PortalHostDirective } from './components/portal-host.directive';
import { PortalContainerComponent } from './containers';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
	],
	declarations: [
		PortalContainerComponent,
		PortalHostDirective,
		PortalAreaComponent
	],
	exports: [
		PortalContainerComponent
	]
})
export class PortalModule {

}
