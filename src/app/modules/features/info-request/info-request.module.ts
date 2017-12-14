import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRequestIntroComponent } from './components/info-request-intro/info-request-intro.component';
import { InfoRequestFormComponent } from './components/info-request-form/info-request-form.component';
import { InfoRequestValidationComponent } from './components/info-request-validation/info-request-validation.component';
import { InfoRequestComponent } from './components/info-request/info-request.component';

// TODO: build our own stepper to not rely on material
import { MatStepperModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { LocalStorageModule } from '../../shared/local-storage/local-storage.module';
import { CompanyModule } from '../../shared/company/company.module';
import { InfoRequestThanksComponent } from './components/info-request-thanks/info-request-thanks.component';
import { InfoRequestStepperComponent } from './components/info-request-stepper/info-request-stepper.component';
import { RouterModule } from '@angular/router';
import { InfoRequestFormBuilderService } from './service/info-request-form-builder.service';
import { CardsModule } from '../../shared/cards/cards.module';
import { AuthModule } from '../../shared/auth/auth.module';


@NgModule({
	imports: [
		CommonModule,
		MatStepperModule,
		FormsModule,
		ReactiveFormsModule,
		InputsModule,
		AuthModule.forChild(),
		RouterModule,
		MatIconModule,
		CardsModule
	],
	providers: [ InfoRequestFormBuilderService ],
	declarations: [ InfoRequestIntroComponent, InfoRequestFormComponent, InfoRequestValidationComponent,
		InfoRequestComponent, InfoRequestThanksComponent, InfoRequestStepperComponent ],
	exports: [ InfoRequestComponent ]
})
export class InfoRequestModule { }
