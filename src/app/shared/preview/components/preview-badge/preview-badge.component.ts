import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EntityMetadata, ERM } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'preview-badge-app',
	templateUrl: './preview-badge.component.html',
	styleUrls: ['./preview-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBadgesComponent extends TrackingComponent implements OnInit {

	@Input() badge: EntityMetadata;
	@Input() value: any;
	@Input() multiple = false;
	@Output() update = new EventEmitter<any>();

	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	erm = ERM;

	visible = false;

	constructor() { super(); }

	ngOnInit() {
	}

	open() {
		this.visible = true;
		this.selector.open();
	}

	close() {
		this.visible = false;
	}

}
