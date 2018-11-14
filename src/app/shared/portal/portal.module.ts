import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';

import { PortalAreaComponent } from './components/portal-area/portal-area.component';
import { PortalHostDirective } from './components/portal-host.directive';
import { PortalContainerComponent } from './containers';
import { CdkPortalComponent } from './components/cdk-portal/cdk-portal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		OverlayModule,
		BidiModule,
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
