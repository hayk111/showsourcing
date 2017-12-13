import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Component, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Currency } from '../../../../store/model/currency.model';
import { AbstractInput } from '../../abstract-input.class';
import { Store } from '@ngrx/store';
import { selectEntity } from '../../../../store/selectors/utils.selector';
import { Observable } from 'rxjs/Observable';


@Component({
	selector: 'input-currency-app',
	templateUrl: './input-currency.component.html',
	styleUrls: ['./input-currency.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputCurrencyComponent),
			multi: true
		}
	]
})
export class InputCurrencyComponent extends AbstractInput implements OnInit {
	private repr = entityRepresentationMap.currencies;
	currencies$: Observable<Currency>;
	@Output() update = new EventEmitter<Currency>();

	constructor(private store: Store<any>, protected inj: Injector) {
		super(inj);
	}

	onChange(value) {
		this.update.emit(value);
		super.onChange(value);
	}

	ngOnInit() {
		super.ngOnInit();
		this.currencies$ = this.store.select(selectEntity(this.repr.entityName));
	}

}
