import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'mg-m'
	}
})
export class CardComponent {
	@Input() padding: 'none' | 'xs' | 's' | 'ms' | 'm' | 'l' | 'xl' = 'l';
	@Input() paddingBottom: 'none' | 'xs' | 's' | 'ms' | 'm' | 'l' | 'xl' = this.padding;
	@ViewChild('ref') ctnrRef;

	get style() {
		if (this.ctnrRef.children === 0)
			return { padding: 0 };
		else
			return {
				padding: `var(--spacing-${this.padding})`,
				'padding-bottom': `var(--spacing-${this.paddingBottom})`
			};
	}

	get footerStyle() {
		return { padding: `0 var(--spacing-${this.padding}) 0 var(--spacing-${this.padding})` };
	}
}
