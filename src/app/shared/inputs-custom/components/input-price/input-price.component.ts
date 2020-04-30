import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '~shared/inputs';

@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)],
	host: {
		'[class.inline]': 'inline'
	}
})
export class InputPriceComponent extends AbstractInput {
	@Input() value: any = { currency: 'USD' };
	@Input() hasLabel = false;
	/** whether the input has borders */
	@Input() inline = false;
	@ViewChild('amountInp') amountInp: ElementRef<HTMLInputElement>;

	focus() {
		this.amountInp.nativeElement.focus();
	}
}
