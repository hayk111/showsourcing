import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from '~app/shared/selectors/components/selector/selector.component';
import { SelectorCountryComponent } from '~app/shared/selectors/components/selector-country/selector-country.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectorCurrencyComponent } from './components/selector-currency/selector-currency.component';
import { SelectorHarbourComponent } from './components/selector-harbour/selector-harbour.component';
import { SelectorIncoTermsComponent } from './components/selector-inco-terms/selector-inco-terms.component';
import { SelectorEntityComponent } from '~app/shared/selectors/components/selector-entity/selector-entity.component';

const components = [
	SelectorComponent,
	SelectorCountryComponent,
	SelectorCurrencyComponent,
	SelectorHarbourComponent,
	SelectorIncoTermsComponent,
	SelectorEntityComponent
]

@NgModule({
	imports: [
		CommonModule,
		NgSelectModule,
		FormsModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
