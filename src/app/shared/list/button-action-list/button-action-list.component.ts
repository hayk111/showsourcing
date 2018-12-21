import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { PreviewActionButton } from '~models';

@Component({
	selector: 'button-action-list-app',
	templateUrl: './button-action-list.component.html',
	styleUrls: ['./button-action-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListActionButtonsComponent extends TrackingComponent implements OnInit {
	@Input() actions: PreviewActionButton[] = [];
	@Output() clickOnAction = new EventEmitter<PreviewActionButton>();
	constructor() {
		super();
	}

	ngOnInit() {

	}
}
