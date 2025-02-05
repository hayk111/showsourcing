import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '~shared/side-menu/components/side-menu/side-menu.component';
import { SideMenuItemComponent } from '~shared/side-menu/components/side-menu-item/side-menu-item.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [SideMenuComponent, SideMenuItemComponent],
	exports: [SideMenuComponent, SideMenuItemComponent]
})
export class SideMenuModule { }
