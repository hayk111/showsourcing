import {
	Attribute,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	ChangeDetectorRef,
	OnChanges
} from '@angular/core';
import { FontSet } from '~shared/icons/components/font-set.enum';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexCenter]': 'true',
		'[class.fs-xxs]': 'size === \'xs\'',
		'[class.fs-l]': 'size === \'s\'',
		'[class.fs-xxl]': 'size === \'m\'',
		'[class.fs-huge]': 'size === \'l\'',
		'[style.font-size]': 'size + \'px\''
	}
})
export class IconComponent implements OnChanges {

	@Input() name: string;
	// symbols give perf gains but are less configurable
	// the fontset used, could be font awesome, svg or anything else added
	@Input() fontSet: FontSet = FontSet.ICOMOON;

	// the size accepts any number and specific sizes as: xs, s, m and l.
	@Input()
	set size(size: number | string) {
		this._size = size;
	}
	get size() {
		if (isNaN(this._size as any)) {
			return `var(--fs-${this._size})`;
		} else {
			return `${this._size}px`;
		}
	}
	private _size: number | string = 'inherit';

	constructor(
		elementRef: ElementRef,
		@Attribute('aria-hidden') ariaHidden: string,
		private cdr: ChangeDetectorRef
	) {
		// If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
		// the right thing to do for the majority of icon use-cases.
		if (!ariaHidden) {
			elementRef.nativeElement.setAttribute('aria-hidden', 'true');
		}
	}

	ngOnChanges(changes) {
		if (changes.name && changes.name.currentValue) {
			this.cdr.markForCheck();
		}
	}
}
