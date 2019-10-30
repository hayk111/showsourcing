import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EntityMetadata, ERM } from '~models';
import { SelectorComponent } from '~shared/selectors';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'preview-badge-app',
	templateUrl: './preview-badge.component.html',
	styleUrls: ['./preview-badge.component.scss'],
	host: {
		'[class.clickable]': 'true'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBadgesComponent extends TrackingComponent implements OnInit {

	@Input() badge: EntityMetadata;
	@Input() value: any;
	@Input() offsetY = -22;
	@Input() multiple = false;
	@Input() hasOpenAction = false;
	private initialMsg = 'Open';
	@Input() toolTipMessage = this.initialMsg;
	@Output() update = new EventEmitter<any>();
	@Output() openActionClicked = new EventEmitter<null>();

	@ViewChild(SelectorComponent, { static: false }) elem: SelectorComponent;

	erm = ERM;

	constructor() { super(); }

	ngOnInit() {
		if (this.toolTipMessage === this.initialMsg)
			this.toolTipMessage = this.toolTipMessage + ' ' + this.badge.singular;
	}

	getDynamicOffsetX() {
		// Y (the offset that we want to move the selector) = -X (size of the selector) + 395, linear function
		return this.elem ? - this.elem.elem.nativeElement.offsetWidth + 395 : 0;
	}

	/** Trackby function for ngFor */
	trackByFn(index, category) {
		return category.key;
	}
}
