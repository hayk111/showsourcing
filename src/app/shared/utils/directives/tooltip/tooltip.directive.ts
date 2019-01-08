import { DomPortalHost, TemplatePortal } from '@angular/cdk/portal';
import {
	ApplicationRef,
	ComponentFactoryResolver,
	Directive,
	ElementRef,
	HostListener,
	Injector,
	Input,
	OnInit,
	ViewContainerRef,
	Renderer2,
} from '@angular/core';

import { TooltipComponent } from './tooltip.component';


export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Directive({
	selector: '[toolTip]'
})
export class TooltipDirective implements OnInit {

	@Input() toolTipMessage = 'Insert tool tip message';
	@Input() toolTipPosition: TooltipPosition = 'below';
	@Input() toolTipShowDelay = 400;
	@Input() toolTipHideDelay = 100;

	private tooltipPortalHost: DomPortalHost;
	private templatePortal: TemplatePortal<any>;

	private _showTimeOutId: number | null;
	private _hideTimeOutId: number | null;

	offsetX = 0;
	offsetY = 0;

	// margin between the tooltip and the element
	margin = 10;

	visible = false;

	@HostListener('mouseenter')
	onMouseEnter() {
		this.show();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.hide();
	}

	constructor(
		private elementRef: ElementRef,
		private appRef: ApplicationRef,
		private injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private componentFR: ComponentFactoryResolver) { }

	ngOnInit() {
		this.tooltipPortalHost = new DomPortalHost(
			// Create the Portal Host on the parent element
			(this.elementRef.nativeElement as HTMLElement).parentElement,
			this.componentFR,
			this.appRef,
			this.injector
		);

		const tooltipComponent = this.componentFR.resolveComponentFactory(TooltipComponent);
		const tooltipComponentRef = tooltipComponent.create(this.injector);
		this.templatePortal = new TemplatePortal(
			tooltipComponentRef.instance.tooltip,
			this.viewContainerRef,
			{
				// Pass the tooltip text as $implicit so it's the
				// default variable for use within the templateRef
				// we pass the offset context later (setPosition()), since we don't know the final position of the element until its hovered
				$implicit: this.toolTipMessage
			}
		);
	}

	private show() {
		if (!this.templatePortal.isAttached) {
			this.setPosition();
			if (this._hideTimeOutId) {
				clearTimeout(this._hideTimeOutId);
				this._hideTimeOutId = null;
			}

			this._showTimeOutId = <any>setTimeout(() => {
				this._showTimeOutId = null;
				this.tooltipPortalHost.attach(this.templatePortal);
			}, this.toolTipShowDelay);
		}
	}

	private hide() {
		if (this._showTimeOutId) {
			clearTimeout(this._showTimeOutId);
			this._showTimeOutId = null;
		}

		this._hideTimeOutId = <any>setTimeout(() => {
			this._hideTimeOutId = null;
			this.tooltipPortalHost.detach();
		}, this.toolTipShowDelay);
	}

	/**
	 * sets the offsets given the position of the tooltip
	 */
	private setPosition() {
		switch (this.toolTipPosition) {
			case 'above':
				this.offsetY = this.elementRef.nativeElement.offsetHeight + this.margin;
				this.offsetX = this.elementRef.nativeElement.offsetWidth / 2;
				break;
			case 'below':
				this.offsetY = this.elementRef.nativeElement.offsetHeight + this.margin;
				this.offsetX = this.elementRef.nativeElement.offsetWidth / 2;
				break;
			case 'right':
				this.offsetY = this.elementRef.nativeElement.offsetHeight / 2;
				this.offsetX = this.elementRef.nativeElement.offsetWidth + this.margin;
				break;
			case 'left':
				this.offsetY = this.elementRef.nativeElement.offsetHeight / 2;
				this.offsetX = this.elementRef.nativeElement.offsetWidth + this.margin;
				break;
		}
		// we update the context of the template with the offsets
		this.templatePortal.context = { ...this.templatePortal.context, offsetX: this.offsetX, offsetY: this.offsetY };
	}
}
