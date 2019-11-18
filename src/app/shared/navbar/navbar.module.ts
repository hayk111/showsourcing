import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule } from '~shared/badge';
import { NavBarComponent } from '~shared/navbar/components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

// spinners, progress bar..
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BadgeModule,
		TranslateModule
	],
	declarations: [NavBarComponent],
	exports: [NavBarComponent]
})
export class NavBarModule { }
