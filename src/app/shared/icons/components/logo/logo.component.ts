import { Component, ChangeDetectionStrategy, Input, ElementRef, Renderer2, ChangeDetectorRef, OnInit } from '@angular/core';
import { AppImage, EntityName } from '~models';
import { Colors, Color } from '~utils';


export const colorMap = {
	[EntityName.CATEGORY]: Color.ACCENT,
	[EntityName.COMMENT]: Color.PRIMARY,
	[EntityName.CONTACT]: Color.SECONDARY,
	[EntityName.EVENT]: Color.SECONDARY,
	[EntityName.PRODUCT]: Color.PRIMARY,
	[EntityName.PROJECT]: Color.SECONDARY,
	[EntityName.SAMPLE]: Color.ACCENT,
	[EntityName.TAG]: Color.SECONDARY,
	[EntityName.TASK]: Color.SUCCESS,
	[EntityName.SUPPLIER]: Color.VIBRANT,
};


export type Size = 's' | 'm' | 'l' | 'xl';

export const sizeMap: { [key in Size]: { background: number, icon: number } } = {
	s: { background: 20, icon: 12 },
	m: { background: 32, icon: 16 },
	l: { background: 36, icon: 24 },
	xl: { background: 92, icon: 40 }
};

@Component({
	selector: 'logo-app',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'class': 'flexCenter',
		'[class.circle]': 'circle === true',
	}
})
export class LogoComponent implements OnInit {
	/** we can supply an image to override the icon */
	@Input() logo: AppImage;
	/** type of entity so we can display its icon */
	@Input() type: EntityName;
	/** whether the background is a circle */
	@Input() circle: boolean;
	/** size of the logo (background included) */
	@Input() size: Size = 'm';
	/** size of icon that can be overriden */
	@Input() iconSize: number;
	/** size of background that can be overriden */
	@Input() backgroundSize: number;

	// getset to override the color if type is specified
	/** displayed color */
	@Input() color: Colors;

	constructor(
		private elRef: ElementRef,
		private renderer: Renderer2
	) {}

	ngOnInit() {
		this.renderContainerSize();
		this.renderColor();
	}

	private renderColor() {
		const el = this.elRef.nativeElement;
		this.renderer.addClass(el, this.getComputedColor());
	}

	private getComputedColor() {
		if (this.color)
			return this.color;
		if (colorMap[this.type])
			return colorMap[this.type];
		throw Error('no color or type specified in logo');
	}

	private renderContainerSize() {
		const backgroundSize = this.getComputedBgSize();
		const iconSize = this.getComputedIconSize();
		const el = this.elRef.nativeElement;
		this.renderer.setStyle(el, 'height', `${backgroundSize}px`);
		this.renderer.setStyle(el, 'width', `${backgroundSize}px`);
		this.renderer.setStyle(el, 'font-size', `${iconSize}px`);
	}

	private getComputedBgSize() {
		return this.backgroundSize || this.getComputedSize().background;
	}

	private getComputedIconSize() {
		return this.iconSize || this.getComputedSize().icon;
	}

	private getComputedSize() {
		if (sizeMap[this.size])
			return sizeMap[this.size];
		throw Error(`${this.size} is not a valid size`);
	}
}