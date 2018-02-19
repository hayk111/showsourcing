import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

// @deprecated the sidenav isn't used anymore
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([])
	],
	declarations: [ SideNavComponent ],
	exports: [ SideNavComponent ]
})
export class SidenavModule { }
