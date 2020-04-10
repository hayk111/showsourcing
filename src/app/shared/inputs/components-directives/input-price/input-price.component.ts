import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '../abstract-input.class';

@Component({
	selector: 'input-price2-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)]
})
export class InputPriceComponent extends AbstractInput {
	@Input() price: any = {};
}
