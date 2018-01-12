import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([])
	],
	declarations: [ SideNavComponent ],
	exports: [ SideNavComponent ]
})
export class SidenavModule { }
