import { CdkConnectedOverlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
	AfterContentChecked,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';

import { SelectorEntityComponent } from '../selector-entity/selector-entity.component';

@Component({
	selector: 'cdk-selector-entity-app',
	templateUrl: './cdk-selector-entity.component.html',
	styleUrls: ['./cdk-selector-entity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkSelectorEntityComponent implements OnInit, AfterContentChecked {

	@Input() trigger: CdkConnectedOverlay;
	@Input() isOpen = false;
	@Input() type: string;
	@Input() closeOnScroll = true;
	@Input() offsetY = 0;
	@Input() offsetX = 0;
	@Input() width = 230;
	@Output() close = new EventEmitter<null>();
	@Output() change = new EventEmitter<any>();

	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	scrollStrat: ScrollStrategy;

	constructor(private sso: ScrollStrategyOptions) { }

	ngOnInit() {
		this.scrollStrat = this.closeOnScroll ? this.sso.close() : this.sso.reposition();
	}

	ngAfterContentChecked() {
		if (this.selector && this.isOpen) {
			this.selector.open();
			this.selector.selector.ngSelect.updateDropdownPosition();
		}
	}

	update(event) {
		this.change.emit(event);
		this.close.emit();
	}

	selectorStyle() {
		return {
			width: `${this.width}px`
		};
	}

}
