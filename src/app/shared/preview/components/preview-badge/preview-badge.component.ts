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
	@Input() offsetX = 18;
	@Input() offsetY = -22;
	@Input() multiple = false;
	@Input() hasPreview = false;
	@Output() update = new EventEmitter<any>();
	@Output() openPreview = new EventEmitter<null>();

	erm = ERM;

	constructor() { super(); }

	ngOnInit() {
	}

}
