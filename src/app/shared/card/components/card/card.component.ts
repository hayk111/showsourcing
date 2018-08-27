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
	@Input() padding: 'none' | 'xs' | 's' | 'ms' | 'm' | 'ml' | 'l' | 'xl' = 'l';
	@ViewChild('ref') ctnrRef;

	get style() {
		if (this.ctnrRef.children === 0)
			return { padding: 0 };
		else
			return {
				padding: `var(--spacing-${this.padding})`
			};
	}

	get footerStyle() {
		return { padding: `0 var(--spacing-${this.padding}) 0 var(--spacing-${this.padding})` };
	}
}
