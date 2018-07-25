import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card/card.module';
import { IconsModule } from '~shared/icons/icons.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SharedModule } from '~shared/shared.module';

import { routes } from './routes';
import { NewRequestPageComponent } from './containers/new-request/new-request-page.component';
import { FillInformationPageComponent } from './containers/fill-information/fill-information-page.component';
import { RefusePageComponent } from './containers/refuse/refuse-page.component';
import { ReviewSendPageComponent } from './containers/review-send/review-send-page.component';
import { ValidationPageComponent } from './containers/validation/validation-page.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TopPanelModule,
		CardModule,
		IconsModule,
		RouterModule.forChild(routes)
	],
	declarations: [NewRequestPageComponent, FillInformationPageComponent, RefusePageComponent,
		ReviewSendPageComponent, ValidationPageComponent],
	exports: [],
	providers: []
})
export class RfqModule { }
