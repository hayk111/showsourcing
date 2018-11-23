import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card/card.module';
import { IconsModule } from '~shared/icons/icons.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SharedModule } from '~shared/shared.module';
import { StageIndicatorModule } from '~shared/stage-indicator/stage-indicator.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { CarouselModule } from '~shared/carousel';
import { DynamicFormsModule } from '~shared/dynamic-forms';

import { routes } from './routes';
import { NewRequestPageComponent } from './containers/new-request/new-request-page.component';
import { FillInformationPageComponent } from './containers/fill-information/fill-information-page.component';
import { RefuseDialogComponent } from './containers/refuse/refuse-dialog.component';
import { ReviewSendPageComponent } from './containers/review-send/review-send-page.component';
import { ValidationPageComponent } from './containers/validation/validation-page.component';
import { ExternalRequestFeatureService } from './services/external-request-feature.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TopPanelModule,
		CardModule,
		IconsModule,
		StageIndicatorModule,
		DialogModule,
		CarouselModule,
		DynamicFormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		NewRequestPageComponent,
		FillInformationPageComponent,
		RefuseDialogComponent,
		ReviewSendPageComponent,
		ValidationPageComponent
	],
	entryComponents: [RefuseDialogComponent],
	exports: [],
	providers: [
		ExternalRequestFeatureService
	]
})
export class RfqModule { }
