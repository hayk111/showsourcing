import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';
import { Event } from '~core/models';

@Component({
	selector: 'selector-event-row-app',
	templateUrl: './selector-event-row.component.html',
	styleUrls: ['./selector-event-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorEventRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() event: Event;

	constructor() { super(); }

	getLabel() {
		return this.event;
	}

}
