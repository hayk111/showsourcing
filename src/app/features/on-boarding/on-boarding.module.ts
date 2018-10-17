import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { FindBusinessComponent } from './components';
import { AddressComponent } from './components/address/address.component';
import { BusinessDescriptionComponent } from './components/business-description/business-description.component';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { ProofOfIdentityComponent } from './components/proof-of-identity/proof-of-identity.component';
import { QRCodeComponent } from './components/qrcode/qrcode.component';
import { VerificationComponent } from './components/verification/verification.component';
import { FileRowComponent } from './components/proof-of-identity/file-row/file-row.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		FindBusinessComponent, WelcomeComponent,
		AddressComponent, BusinessTypeComponent,
		CategoryComponent, BusinessDescriptionComponent,
    ContactDetailsComponent,
    AccountCreationComponent,
    CongratulationsComponent,
    ProofOfIdentityComponent,
    QRCodeComponent,
    VerificationComponent,
    FileRowComponent
	]
})
export class OnBoardingModule { }
