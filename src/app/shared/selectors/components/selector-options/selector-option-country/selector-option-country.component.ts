import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { Country } from '~core/erm/models';

@Component({
	selector: 'selector-option-country-app',
	templateUrl: './selector-option-country.component.html',
	styleUrls: ['./selector-option-country.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionCountryComponent extends AbstractSelectorHighlightableComponent {

	@Input() country: Country;

	constructor() { super(); }

	getLabel() {
		return this.country.countryCode;
	}

	getItem() {
		return this.country;
	}

}
