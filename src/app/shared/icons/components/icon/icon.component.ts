import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { FontSet } from '~shared/icons/components/font-set.enum';


export type Sizes = 's' | 'm' | 'l' | 'inherit';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexCenter]': 'true',
		'[style.font-size]': 'getComputedSize()'
	}
})
export class IconComponent implements OnInit {

	@Input() name: string;
	// symbols give perf gains but are less configurable
	// the fontset used, could be font awesome, svg or anything else added
	@Input() fontSet: FontSet = FontSet.ICOMOON;

	// the size accepts any number and specific sizes as: xs, s, m and l.
	@Input()
	size: number | Sizes = 'inherit';

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2,
		@Attribute('aria-hidden') ariaHidden: string
	) {
		// If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
		// the right thing to do for the majority of icon use-cases.
		if (!ariaHidden) {
			elementRef.nativeElement.setAttribute('aria-hidden', 'true');
		}
	}

	ngOnInit() {
		this.setSizeElem();
	}

	private setSizeElem() {
		const el = this.elementRef.nativeElement;
		this.renderer.setStyle(el, 'font-size', this.getComputedSize());
	}

	private getComputedSize() {
		switch (this.size) {
			case 's':
			case 'm':
			case 'l':
				return `var(--font-size-icon-${this.size})`;
			case 'inherit':
				return 'inherit';
			default:
				return `${this.size}px`;
		}
	}

}
