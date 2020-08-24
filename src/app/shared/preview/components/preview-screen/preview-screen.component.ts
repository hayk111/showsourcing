import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'preview-screen-app',
	templateUrl: './preview-screen.component.html',
	styleUrls: ['./preview-screen.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewScreenComponent extends TrackingComponent implements OnInit {

	@Output() close = new EventEmitter<void>();

	constructor() {
		super();
	}

	ngOnInit() {

	}

	onClose() {
		this.close.emit();
	}
}
