import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../abstract-input.class';

@Component({
	selector: 'input-price2-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)]
})
export class InputPriceComponent extends AbstractInput {
	@Input() value: any = {};
}
