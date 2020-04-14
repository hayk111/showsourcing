import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { slideAnimation } from './slide.animation';

@Component({
	selector: 'accordion-app',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ slideAnimation ]
})
export class AccordionComponent implements OnInit {
	@Input() initialState: 'open' | 'closed' = 'open';
	isOpen = true;

	ngOnInit() {
		this.isOpen = this.initialState === 'open' ? true : false;
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}

}
