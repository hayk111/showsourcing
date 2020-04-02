import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { HeaderModule } from '~core/header/header.module';
import { GuestTemplateComponent } from '~core/template/components/guest-template/guest-template.component';
import { TemplateComponent } from '~core/template/components/template/template.component';
import { IconsModule } from '~shared/icons';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		HeaderModule,
		IconsModule,
		ScrollingModule
	],
	declarations: [TemplateComponent, GuestTemplateComponent],
	exports: [],
})
export class TemplateModule {

}
