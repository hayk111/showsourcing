import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
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

	isMenuOpened = false;

	toggleContext() {
		this.isMenuOpened = !this.isMenuOpened;
	}

	constructor() {
		super();
	}

	ngOnInit() {

	}
}
