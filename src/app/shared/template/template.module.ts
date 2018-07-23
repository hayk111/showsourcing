import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { HeaderModule } from '~shared/header/header.module';
import { GuestTemplateComponent } from '~shared/template/components/guest-template/guest-template.component';
import { TemplateComponent } from '~shared/template/components/template/template.component';

@NgModule({
	imports: [SharedModule, RouterModule.forChild([]), HeaderModule],
	declarations: [TemplateComponent, GuestTemplateComponent],
	exports: [],
})
export class TemplateModule {

}
