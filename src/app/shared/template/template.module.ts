import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { HeaderModule } from '~shared/header/header.module';
import { GuestTemplateComponent } from '~shared/template/components/guest-template/guest-template.component';
import { TemplateComponent } from '~shared/template/components/template/template.component';
import { RfqTemplateComponent } from '~shared/template/components/rfq-template/rfq-template.component';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		HeaderModule,
		IconsModule
	],
	declarations: [TemplateComponent, GuestTemplateComponent, RfqTemplateComponent],
	exports: [],
})
export class TemplateModule {

}
