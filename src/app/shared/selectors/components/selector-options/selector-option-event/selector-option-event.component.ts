import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { Event } from '~core/ORM/models';

@Component({
	selector: 'selector-option-event-app',
	templateUrl: './selector-option-event.component.html',
	styleUrls: ['./selector-option-event.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionEventComponent extends AbstractSelectorHighlightableComponent {

	@Input() event: Event;

	constructor() { super(); }

	getLabel() {
		return this.event;
	}

	getItem() {
		return this.event;
	}

}
