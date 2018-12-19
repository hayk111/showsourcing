import { CdkConnectedOverlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

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

	scrollStrat: ScrollStrategy;

	constructor(private sso: ScrollStrategyOptions) { }

	ngOnInit() {
		this.scrollStrat = this.closeOnScroll ? this.sso.close() : this.sso.reposition();
	}
}
