import { CdkConnectedOverlay, ScrollDispatcher, ScrollStrategy, ScrollStrategyOptions, ConnectedPosition } from '@angular/cdk/overlay';
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
	// wheter the selector opens first to the most right side or the most left side
	@Input() leftSideOrientation = false;
	@Output() positionChange = new EventEmitter<any>();
	updated = false;

	@ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;
	scrollStrat: ScrollStrategy;

	constructor(private sso: ScrollStrategyOptions, private scd: ScrollDispatcher) {
	}

	ngOnInit() {
		// to understand ConnectedPositions
		// originX/Y -> origin position where the overlay will open
		// i.e. originX: 'start' originY: 'end' would mean left-bottom of the item
		// overlayX/Y -> position where the overlay will be attached.
		// i.e. overlayX: 'start', overlayY: 'bottom' is attaching the left bottom part to the origin
		// this.scrollStrat = this.closeOnScroll ? this.sso.close() : this.sso.reposition();
		// const positions: ConnectedPosition[] = [
		// 	{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
		// 	{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
		// 	{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
		// 	{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
		// ];
		// this.cdkConnectedOverlay.positions = this.leftSideOrientation ? positions.reverse() : positions;

		this.cdkConnectedOverlay.positionChange.pipe(first()).subscribe(posChange => {
			const elem = (document.getElementsByClassName('cdk-overlay-pane')[0] as any);
			elem.style.removeProperty('top');
			elem.style.removeProperty('left');
			elem.style.removeProperty('right');
			elem.style.removeProperty('bottom');
		});
	}
}
