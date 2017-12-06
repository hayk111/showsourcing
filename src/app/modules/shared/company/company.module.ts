import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageModule } from '../local-storage/local-storage.module';
import { CompanyService } from './services/company.service';

@NgModule({
	imports: [
		CommonModule,
		LocalStorageModule
	],
	providers: [ CompanyService ],
	declarations: []
})
export class CompanyModule { }
