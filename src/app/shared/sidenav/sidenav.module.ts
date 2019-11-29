import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '~shared/icons';
import { LogoModule } from '~shared/logo';
import { SidenavItemGroupComponent } from '~shared/sidenav/components/sidenav-item-group/sidenav-item-group.component';
import { SidenavItemLabelDirective } from '~shared/sidenav/components/sidenav-item-label/sidenav-item-label.directive';
import { SidenavItemComponent } from '~shared/sidenav/components/sidenav-item/sidenav-item.component';
import { SidenavComponent } from '~shared/sidenav/components/sidenav/sidenav.component';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		RouterModule.forChild([]),
		CommonModule,
		UtilsModule,
		IconsModule,
		LogoModule
	],
	declarations: [
		SidenavComponent,
		SidenavItemComponent,
		SidenavItemLabelDirective,
		SidenavItemGroupComponent
	],
	exports: [
		SidenavComponent,
		SidenavItemComponent,
		SidenavItemLabelDirective,
		SidenavItemGroupComponent
	]
})
export class SidenavModule { }
