import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { PreviewActionButton } from '~core/ORM/models';

@Component({
	selector: 'preview-actions-app',
	templateUrl: './preview-actions.component.html',
	styleUrls: ['./preview-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewActionsComponent extends TrackingComponent implements OnInit {
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
