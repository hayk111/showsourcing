import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';

import { CdkPortalComponent } from './components/cdk-portal/cdk-portal.component';
import { PortalAreaComponent } from './components/portal-area/portal-area.component';
import { PortalHostDirective } from './components/portal-host.directive';
import { PortalContainerComponent } from './containers';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		OverlayModule,
		PlatformModule,
		ScrollDispatchModule
	],
	declarations: [
		PortalContainerComponent,
		PortalHostDirective,
		PortalAreaComponent,
		CdkPortalComponent
	],
	exports: [
		PortalContainerComponent,
		CdkPortalComponent
	],
	entryComponents: [CdkPortalComponent]
})
export class PortalModule {

}
