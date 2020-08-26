import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { TrackingComponent } from '~utils/tracking-component';
import { DialogService } from '~shared/dialog';
import { first } from 'rxjs/operators';

@Component({
	selector: 'preview-screen-app',
	templateUrl: './preview-screen.component.html',
	styleUrls: ['./preview-screen.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewScreenComponent extends TrackingComponent {

	@Output() close = new EventEmitter<void>();

	constructor(private dlgSrv: DialogService) {
		super();
	}

	onClose(ev: MouseEvent) {
		if (this.dlgSrv.opened) {
			return;
		}
		this.close.emit();
	}
}
