import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SelectorsService } from '~shared/selectors/selectors.service';
import { CustomSelector } from '~shared/selectors/utils/custom-selector.class';
import { makeAccessorProvider } from '~shared/inputs';


@Component({
	selector: 'selector-harbour-app',
	templateUrl: './selector-harbour.component.html',
	styleUrls: ['./selector-harbour.component.scss'],
	providers: [makeAccessorProvider(SelectorHarbourComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorHarbourComponent extends CustomSelector<string> {

	constructor(private srv: SelectorsService) {
		super();
		// this.choices = this.srv.getHarbours();
	}

}
