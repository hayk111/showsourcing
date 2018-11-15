import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
	selector: 'cdk-portal-app',
	templateUrl: './cdk-portal.component.html',
	styleUrls: ['./cdk-portal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkPortalComponent implements OnInit {

	// PORTAL & OVERLAY WITHOUT DIRECTIVE
	constructor() { }

	ngOnInit() { }

	// OVERLAY WITH DIRECTIVE
	// @Input() overlayOrigin: CdkOverlayOrigin;
	// @Input() isOpened = false;
}
