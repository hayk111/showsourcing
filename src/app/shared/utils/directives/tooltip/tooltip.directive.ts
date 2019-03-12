import { DomPortalHost, TemplatePortal } from '@angular/cdk/portal';
import {
	ApplicationRef,
	ComponentFactoryResolver,
	Directive,
	ElementRef,
	HostListener,
	Injector,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	ViewContainerRef,
} from '@angular/core';

import { TooltipComponent } from './tooltip.component';


export type TooltipPosition = 'above-right' | 'above-left' | 'below-right' | 'below-left' | 'left' | 'right';

@Directive({
	selector: '[toolTip]'
})
export class TooltipDirective implements OnInit, OnChanges, OnDestroy {

	@Input() toolTipMessage = 'Insert tool tip message';
	@Input() toolTipPosition: TooltipPosition = 'below-left';
	@Input() toolTipShowDelay = 400;
	@Input() toolTipHideDelay = 100;
	@Input() offsetX = 0;
	@Input() offsetY = 0;

	private tooltipPortalHost: DomPortalHost;
	private templatePortal: TemplatePortal<any>;

	private _showTimeOutId: number | null;
	private _hideTimeOutId: number | null;

	// margin between the tooltip and the element
	margin = 5;

	// only for a small condition when setting position, we need to know if its the first time loading it or not
	firstTime = true;

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

	ngOnDestroy() {
		this.hide();
	}

	ngOnInit() {
		this.tooltipPortalHost = new DomPortalHost(
			// Create the Portal Host on the parent element
			// (this.elementRef.nativeElement as HTMLElement).parentElement,
			document.body,
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
				$implicit: this.toolTipMessage,
				position: this.toolTipPosition
			}
		);
	}

	ngOnChanges() {
		if (this.tooltipPortalHost) {
			const boundPortal = this.tooltipPortalHost.outletElement.getElementsByClassName('tooltip-directive')[0];
			if (boundPortal) {
				this.setPosition(boundPortal.getBoundingClientRect());
				this.templatePortal.context = {
					...this.templatePortal.context, $implicit: this.toolTipMessage
				};
			}
		}
	}

	private show() {
		if (!this.templatePortal.isAttached) {
			if (this._hideTimeOutId) {
				clearTimeout(this._hideTimeOutId);
				this._hideTimeOutId = null;
			}

			this._showTimeOutId = <any>setTimeout(() => {
				this._showTimeOutId = null;
				// we attach the first time to know the bounding rectangle of the item
				this.tooltipPortalHost.attach(this.templatePortal);
				const elementPortal = this.tooltipPortalHost.outletElement.getElementsByClassName('tooltip-directive')[0];
				const boundPortal = elementPortal ? elementPortal.getBoundingClientRect() : new ClientRect();
				// we detach it since we only wanted the rectangle
				this.tooltipPortalHost.detach();
				this.setPosition(boundPortal);
				// we render it again with the new positions on the context of tempaltePortal
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
		}, this.toolTipHideDelay);
	}

	/**
	 * sets the position of the tooltip given the toolTip bounding rectangle
	 */
	private setPosition(boundPortalContent) {
		// arrow that indicates where the tooltip is coming from
		const arrowSize = 8;
		// the result of the translation calculation
		let result: number;
		// transformation string result
		let transform = 'none';
		// the element that we hover
		const nativeEl = this.elementRef.nativeElement;
		const bound = nativeEl.getBoundingClientRect();
		// for some reason when it loads the second time the same element, the bound.x is displaced 6px
		if (!this.firstTime) bound.x = bound.x - 6;
		this.firstTime = false;
		switch (this.toolTipPosition) {
			case 'above-right':
				bound.y = bound.y - bound.height - arrowSize - this.margin;
				result = - (boundPortalContent.width - bound.width);
				transform = `translateX(${result}px)`;
				break;
			case 'above-left':
				bound.y = bound.y - bound.height - arrowSize - this.margin;
				break;
			case 'below-left':
				bound.y = bound.y + bound.height + arrowSize + this.margin;
				break;
			case 'below-right':
				bound.y = bound.y + bound.height + arrowSize + this.margin;
				result = - (boundPortalContent.width - bound.width);
				transform = `translateX(${result}px)`;
				break;
			case 'right':
				bound.x = bound.x + bound.width + arrowSize + this.margin;
				break;
			case 'left':
				bound.x = bound.x - arrowSize - this.margin;
				result = - boundPortalContent.width;
				transform = `translateX(${result}px)`;
				break;
		}
		bound.x += this.offsetX;
		bound.y += this.offsetY;
		// we update the context of the template with the offsets
		this.templatePortal.context = {
			...this.templatePortal.context, $implicit: this.toolTipMessage, boundPosition: bound, transform
		};
	}
}
