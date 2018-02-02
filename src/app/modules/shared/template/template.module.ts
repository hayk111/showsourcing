import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './components/template/template.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		SidenavModule,
		HeaderModule,
	],
	providers: [  ],
	declarations: [ TemplateComponent ],
	exports: [ TemplateComponent ]
})
export class TemplateModule { }
