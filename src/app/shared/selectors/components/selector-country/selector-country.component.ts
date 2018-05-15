import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectorsService } from '~app/shared/selectors/selectors.service';
import { CustomSelector } from '~app/shared/selectors/utils/custom-selector.class';
import { makeAccessorProvider } from '~app/shared/inputs';


@Component({
	selector: 'selector-country-app',
	templateUrl: './selector-country.component.html',
	styleUrls: ['./selector-country.component.scss'],
	providers: [makeAccessorProvider(SelectorCountryComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCountryComponent extends CustomSelector<string> {

	constructor(private srv: SelectorsService) {
		super();
		// this.choices = this.srv.getCountries();
	}

}
