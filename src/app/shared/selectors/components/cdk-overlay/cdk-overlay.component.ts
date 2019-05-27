import { CdkConnectedOverlay, ScrollDispatcher, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
	selector: 'cdk-overlay-app',
	templateUrl: './cdk-overlay.component.html',
	styleUrls: ['./cdk-overlay.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkOverlayComponent implements OnInit {

	@Input() trigger: CdkConnectedOverlay;
	@Input() isOpen = false;
	@Input() closeOnScroll = true;
	@Input() offsetY = 0;
	@Input() offsetX = 0;
	@Output() positionChange = new EventEmitter<any>();
	updated = false;

	@ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;
	scrollStrat: ScrollStrategy;

	constructor(private sso: ScrollStrategyOptions, private scd: ScrollDispatcher) {
	}

	ngOnInit() {
		// to understand ConnectedPositions
		// originX/Y -> origin position where the overlay will open
		// i.e. originX: 'start' originY: 'end' would mean left-bottom of the item
		// overlayX/Y -> position where the overlay will be attached.
		// i.e. overlayX: 'start', overlayY: 'bottom' is attaching the left bottom part to the origin
		this.scrollStrat = this.closeOnScroll ? this.sso.close() : this.sso.reposition();
		this.cdkConnectedOverlay.positions = [
			{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
			{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
			{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
			{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
		];
		this.cdkConnectedOverlay.positionChange.pipe(first()).subscribe(posChange => {
			// when its upside down we eliminate the offsets
			if (posChange.connectionPair.overlayY === 'bottom') {
				this.cdkConnectedOverlay.offsetY = 0;
				this.cdkConnectedOverlay.offsetX = 0;
			}
			this.cdkConnectedOverlay.overlayRef.updatePosition();
		});
	}
}
