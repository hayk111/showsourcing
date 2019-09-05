import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardFooterComponent } from '~shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '~shared/card/components/card-header/card-header.component';
import { CardComponent } from '~shared/card/components/card/card.component';
import { DividerModule } from '~shared/divider/divider.module';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { CardTitleBadgeComponent } from './components/card-title-badge/card-title-badge.component';
import { CardActionComponent } from './components/card-action/card-action.component';
import { BadgeModule } from '~shared/badge';
import { CardNavComponent } from './components/card-nav/card-nav.component';
import { CardNavLogoItemComponent } from './components/card-nav-logo-item/card-nav-logo-item.component';


const components = [
	CardComponent,
	CardHeaderComponent,
	CardFooterComponent,
	CardTitleComponent,
	CardTitleBadgeComponent,
	CardActionComponent,
	CardNavComponent,
	CardNavLogoItemComponent
];

@NgModule({
	imports: [
		CommonModule,
		DividerModule,
		BadgeModule
	],
	declarations: components,
	exports: components
})
export class CardModule { }
