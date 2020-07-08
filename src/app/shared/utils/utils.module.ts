import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniScrollDirective, TooltipComponent, TooltipDirective, HorizontalScrollDirective } from '~shared/utils/directives';
import { AutoFocusDirective } from '~shared/utils/directives/auto-focus.directive';
import { ClickOutsideDirective } from '~shared/utils/directives/click-outside.directive';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { DateToTimeAgoPipe } from '~shared/utils/pipes/date-ago.pipe';
import { GroupByPipe } from '~shared/utils/pipes/groupby.pipe';
import { UserNamePipe } from '~shared/utils/pipes/user-name.pipe';

import { TabFocusActionDirective } from './directives/tab-focus-action.directive';
import { CountryCityPipe } from './pipes/country-city.pipe';
import { PropertyPipe } from './pipes/property.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		GroupByPipe,
		InfiniScrollDirective,
		ConstPipe,
		AutoFocusDirective,
		TooltipDirective,
		TooltipComponent,
		TabFocusActionDirective,
		CapitalizePipe,
		CountryCityPipe,
		HorizontalScrollDirective,
		PropertyPipe,
	],
	exports: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		InfiniScrollDirective,
		ConstPipe,
		GroupByPipe,
		AutoFocusDirective,
		CapitalizePipe,
		TooltipDirective,
		TabFocusActionDirective,
		CountryCityPipe,
		PropertyPipe,
		HorizontalScrollDirective,
	],
	providers: [
		ConstPipe
	],
	entryComponents: [TooltipComponent]
})
export class UtilsModule { }
