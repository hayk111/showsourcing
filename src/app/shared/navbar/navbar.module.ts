import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '~shared/navbar/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

// spinners, progress bar..
@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [ NavBarComponent ],
	exports: [ NavBarComponent ]
})
export class NavBarModule { }
