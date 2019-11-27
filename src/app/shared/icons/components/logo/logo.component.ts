import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { AppImage, EntityName } from '~models';
import { Colors, iconMap, iconsColorMap, iconSizeMap, log, Size } from '~utils';

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
export class LogoComponent implements OnChanges {
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
	/** to override the default icon given by type */
	@Input() icon: string;

	// getset to override the color if type is specified
	/** displayed color */
	@Input() color: Colors;

	constructor(
		private elRef: ElementRef,
		private renderer: Renderer2
	) { }

	ngOnChanges() {
		this.renderContainerSize();
		this.renderColor();
		if (!this.type) {
			log.error('No type specified in logo');
		}
	}

	get computedIcon() {
		return this.icon || iconMap[this.type];
	}

	private renderColor() {
		const el: HTMLElement = this.elRef.nativeElement;
		const found = Array.from(el.classList).find(className => className.startsWith('color-'));
		this.renderer.removeClass(el, found);
		this.renderer.addClass(el, 'color-' + this.getComputedColor());
	}

	private getComputedColor() {
		if (this.color)
			return this.color;
		if (iconsColorMap[this.type])
			return iconsColorMap[this.type];
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
		if (iconSizeMap[this.size])
			return iconSizeMap[this.size];
		throw Error(`${this.size} is not a valid size`);
	}
}
