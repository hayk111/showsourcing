import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '~shared/icons';
import { SideBarModule } from '../side-bar/side-bar.module';
import { GuestTemplateComponent } from './components/guest-template/guest-template.component';
import { TemplateComponent } from './components/template/template.component';
import { CommonModule } from '@angular/common';


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		SideBarModule,
		IconsModule,
		ScrollingModule
	],
	declarations: [TemplateComponent, GuestTemplateComponent],
	exports: [],
})
export class TemplateModule {

}
