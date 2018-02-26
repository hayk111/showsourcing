import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../header/header.module';
import { TemplateComponent } from './components/template/template.component';

@NgModule({
	imports: [CommonModule, RouterModule.forChild([]), HeaderModule],
	providers: [],
	declarations: [TemplateComponent],
	exports: [TemplateComponent],
})
export class TemplateModule {}
