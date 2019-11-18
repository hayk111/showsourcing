import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';
import { Country } from '~core/models';

@Component({
	selector: 'selector-country-row-app',
	templateUrl: './selector-country-row.component.html',
	styleUrls: ['./selector-country-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCountryRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() country: Country;

	constructor() { super(); }

	getLabel() {
		return this.country.countryCode;
	}

}
