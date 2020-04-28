import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Packaging } from '~core/erm3/models';
import { AbstractInput, makeAccessorProvider } from '../abstract-input.class';

@Component({
	selector: 'input-packaging-app',
	templateUrl: './input-packaging.component.html',
	styleUrls: ['./input-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPackagingComponent)]
})
export class InputPackagingComponent extends AbstractInput {
	@Input() value: Packaging = {};

	onChange(prop, value) {
		const v = this.value;
		v[prop] = value;
		// when this is required we notify the change only xhen none of the value is null
		if (this.required) {
			if (
				v.length !== null &&
				v.height !== null &&
				v.width !== null &&
				v.lengthUnit !== null &&
				v.quantity !== null &&
				v.weight !== null &&
				v.weightUnit !== null
			) {
				this.onChangeFn();
			}
		} else {
			this.onChangeFn();
		}
	}
}
