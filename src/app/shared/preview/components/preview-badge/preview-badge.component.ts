import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityMetadata, ERM } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

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

	erm = ERM;

	constructor() { super(); }

	ngOnInit() {
	}

}
