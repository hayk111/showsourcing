import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input, TemplateRef, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
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
			transition('* => *', animate(400)),
		]),
	],
})
export class PreviewScreenComponent extends TrackingComponent implements OnChanges {
	@Output() close = new EventEmitter<void>();

	_opened = false;
	animationPending = false;

	@Input() set opened(open: boolean) {
		this._opened = open;
	}

	get opened() {
		return this._opened;
	}

	constructor(private dlgSrv: DialogService, private cdr: ChangeDetectorRef) {
		super();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.opened.previousValue !== changes.opened.currentValue) {
			this.animationStarted();
		}
	}

	onClose(ev: MouseEvent) {
		if (this.dlgSrv.opened) {
			return;
		}
		this.close.emit();
	}

	animationStarted() {
		this.animationPending = true;
		setTimeout(() => {
			if (this.animationPending) {
				this.animationPending = false;
				this.cdr.markForCheck();
			}
		}, 550);
	}
}
