import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { SidenavComponent } from '~shared/sidenav/components/sidenav/sidenav.component';
import { SidenavItemComponent } from '~shared/sidenav/components/sidenav-item/sidenav-item.component';
import { SidenavItemLabelDirective } from '~shared/sidenav/components/sidenav-item-label/sidenav-item-label.directive';
import { SidenavItemGroupComponent } from '~shared/sidenav/components/sidenav-item-group/sidenav-item-group.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([]),
		CommonModule,
		UtilsModule,
		IconsModule
	],
	declarations: [SidenavComponent, SidenavItemComponent, SidenavItemLabelDirective, SidenavItemGroupComponent],
	exports: [SidenavComponent, SidenavItemComponent, SidenavItemLabelDirective, SidenavItemGroupComponent]
})
export class SidenavModule { }
