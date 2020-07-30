import {
	EditableContainerComponent
} from '../../../editable/components/editable-container/editable-container.component';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EntityMetadata, ERM } from '~core/erm';
import { SelectorComponent } from '~shared/selectors';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'badge-selector-app',
	templateUrl: './badge-selector.component.html',
	styleUrls: ['./badge-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeSelectorComponent extends TrackingComponent implements OnInit {

	@Input() badge: EntityMetadata;
	@Input() customType: string;
	@Input() value: any;
	@Input() isFullWidth: boolean;
	@Input() offsetY = -22;
	@Input() multiple = false;
	@Input() hasOpenAction = false;
	@Input() leftSideOrientation = false;
	@Input() hasLogo = true;
	private initialMsg = 'Open';
	@Input() toolTipMessage = this.initialMsg;
	/** whether the hovor color should be var(--color-bg-secondary) or not, default is not */
	@Input() hoverLight = false;
	@Output() update = new EventEmitter<any>();
	@Output() openActionClicked = new EventEmitter<null>();

	@ViewChild(SelectorComponent, { static: false }) selector: SelectorComponent;
	@ViewChild('editableContainer', { static: true }) editableCont: EditableContainerComponent;

	erm = ERM;

	constructor() { super(); }

	ngOnInit() {
		if (this.toolTipMessage === this.initialMsg)
			this.toolTipMessage = this.toolTipMessage + ' ' + this.badge.singular;
	}

	getDynamicOffsetX() {
		// Y (the offset that we want to move the selector) = -X (size of the selector) + 395, linear function
		return this.selector ? - this.selector.elem.nativeElement.offsetWidth + 395 : 0;
	}

	/** Trackby function for ngFor */
	trackByFn(index, category) {
		return category.key;
	}

	onOpenActionClick(event: MouseEvent) {
		// we stop the propagation of the click so the selector is not opened
		event.stopImmediatePropagation();
		this.openActionClicked.emit();
	}
}
