import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ERM } from '~core/models';
import { Packaging } from '~models/packaging.model';
import { AbstractInput } from '~shared/inputs';

@Component({
	selector: 'input-packaging-app',
	templateUrl: './input-packaging.component.html',
	styleUrls: ['./input-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPackagingComponent extends AbstractInput {

	erm = ERM;

	@Input() set value(packaging: Packaging) {
		// we add an uuid for new packaging
		this._value = { ...packaging } || new Packaging();
	}
	get value() { return this._value; }
	private _value;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	update(item, prop) {
		this.value = { ...this.value, [prop]: item };
	}
}
