import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'input-tags-app',
	templateUrl: './input-tags.component.html',
	styleUrls: ['./input-tags.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTagsComponent extends TrackingComponent implements OnInit {

	@Input() tags: Tag[];
	// position of the selector in case we need a special one
	@Input() offsetX = 0;
	@Input() offsetY = -28;
	@Output() updateTags = new EventEmitter<Tag[]>;

	constructor() { super(); }

	ngOnInit() {
	}

}
