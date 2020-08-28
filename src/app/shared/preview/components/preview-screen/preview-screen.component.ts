import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { TrackingComponent } from '~utils/tracking-component';
import { DialogService } from '~shared/dialog';
import { first } from 'rxjs/operators';
import { input } from 'aws-amplify';

@Component({
	selector: 'preview-screen-app',
	templateUrl: './preview-screen.component.html',
	styleUrls: ['./preview-screen.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('opened', [
			state('true', style({
				right: 0,
			})),
			state('false', style({
				right: '-95%',
			})),
			transition('* => *', animate('400ms')),
		]),
	],
})
export class PreviewScreenComponent extends TrackingComponent {

	@Output() close = new EventEmitter<void>();

	_opened = false;
	showPreview = false;

	animationPending = false;

	@Input() set opened(open: boolean) {
		this._opened = open;
		this.showPreview = open;
	}

	get opened() {
		return this._opened;
	}

	constructor(private dlgSrv: DialogService, private cdr: ChangeDetectorRef) {
		super();
	}

	onClose(ev: MouseEvent) {
		if (this.dlgSrv.opened) {
			return;
		}
		this.close.emit();
		this.animationStarted();
	}

	animationStarted() {
		this.animationPending = true;

		setTimeout(() => {
			this.animationPending = false;

			if (!this.animationPending && !this.opened) { // for the closed case
				this.cdr.detectChanges();
			}
		}, 550);
	}
}
