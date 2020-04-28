import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '~shared/inputs';

@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)]
})
export class InputPriceComponent extends AbstractInput {
	@Input() value: any = {};
	@Input() hasLabel = false;
	@ViewChild('amountInp') amountInp: ElementRef<HTMLInputElement>;

	focus() {
		this.amountInp.nativeElement.focus();
	}
}
