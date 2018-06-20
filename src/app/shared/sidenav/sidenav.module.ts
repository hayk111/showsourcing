import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { SidenavItemLabelDirective } from './components/sidenav-item-label/sidenav-item-label.directive';
import { SidenavItemGroupComponent } from './components/sidenav-item-group/sidenav-item-group.component';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule
	],
	declarations: [SidenavComponent, SidenavItemComponent, SidenavItemLabelDirective, SidenavItemGroupComponent],
	exports: [SidenavComponent, SidenavItemComponent, SidenavItemLabelDirective, SidenavItemGroupComponent]
})
export class SidenavModule { }
