import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { FontSet } from '~shared/icons/components/font-set.enum';


export type Sizes = 'xs' | 's' | 'ms' | 'm' | 'l' | 'inherit';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {

	@Input() name: string;
	// symbols give perf gains but are less configurable
	// the fontset used, could be font awesome, svg or anything else added
	@Input() fontSet: FontSet = FontSet.ICOMOON;

	// the size accepts any number and specific sizes as: xs, s, m and l.
	@Input()
	size: number | Sizes = 'inherit';

	constructor(
		elementRef: ElementRef,
		@Attribute('aria-hidden') ariaHidden: string
	) {
		// If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
		// the right thing to do for the majority of icon use-cases.
		if (!ariaHidden) {
			elementRef.nativeElement.setAttribute('aria-hidden', 'true');
		}
	}

	getComputedSize() {
		switch (this.size) {
			case 'xs':
			case 's':
			case 'ms':
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
