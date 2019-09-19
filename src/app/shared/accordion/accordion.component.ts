import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { slideAnimation } from './slide.animation';

@Component({
	selector: 'accordion-app',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ slideAnimation ]
})
export class AccordionComponent {

	isContentShown = true;

	toggle() {
		this.isContentShown = !this.isContentShown;
	}

}
