import { Injectable, Inject, OnInit, ComponentFactoryResolver, ApplicationRef, Injector, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';

import { CdkPortalComponent } from './cdk-portal.component';
import { CdkPortalRef } from './cdk-porta-ref.component';
import { longStackSupport } from 'q';



@Injectable({ providedIn: 'root' })
export class CdkPortalService {
	/** PORTAL SHIET */
	// private cdkPortalComponent: ComponentPortal<CdkPortalComponent>;
	// private bodyPortalHost: DomPortalHost;

	// constructor(
	// 	private componentFactoryResolver: ComponentFactoryResolver,
	// 	private appRef: ApplicationRef,
	// 	private injector: Injector) {
	// this.cdkPortalComponent = new ComponentPortal(CdkPortalComponent);

	// this.bodyPortalHost = new DomPortalHost(
	// 	document.body,
	// 	this.componentFactoryResolver,
	// 	this.appRef,
	// 	this.injector
	// );
	// }

	// reveal() {
	// 	const overlayRef = this.bodyPortalHost.attach(this.cdkPortalComponent);
	// }

	// hide() {
	// 	this.cdkPortalComponent.detach();
	// }

	/** OVERLAY WITHOUT DIRECTIVE */
	constructor(private overlay: Overlay, private overlayPos: OverlayPositionBuilder) { }

	open(element: ElementRef) {
		const positionStrategy = this.overlayPos
			.flexibleConnectedTo(element).withViewportMargin(5)
			.withPositions([{ overlayX: 'start', overlayY: 'top', originX: 'end', originY: 'bottom' }]);
		const overlayRef = this.overlay
			.create({
				positionStrategy,
				scrollStrategy: this.overlay.scrollStrategies.close()
			});
		const dialogRef = new CdkPortalRef(overlayRef);
		const theOverlayRef = new ComponentPortal(CdkPortalComponent);
		overlayRef.attach(theOverlayRef);
		// overlayRef.backdropClick().subscribe(_ => dialogRef.close());

	}


}
