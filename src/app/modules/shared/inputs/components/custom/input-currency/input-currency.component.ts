import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Component, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import { entityRepresentationMap, EntityState } from '../../../../../store/utils/entities.utils';
import { Currency } from '../../../../../store/model/currency.model';
import { selectEntity } from '../../../../../store/selectors/utils.selector';


@Component({
	selector: 'input-currency-app',
	templateUrl: './input-currency.component.html',
	styleUrls: ['./input-currency.component.scss'],
	providers: [ makeAccessorProvider(InputCurrencyComponent)]
})
export class InputCurrencyComponent extends AbstractInput implements OnInit {
	private repr = entityRepresentationMap.currencies;
	currencies$: Observable<EntityState<Currency>>;
	private currencies: EntityState<Currency>;
	@Output() update = new EventEmitter<Currency>();

	constructor(private store: Store<any>) {
		super();
	}

	onChange(id: string) {
		const currency = this.currencies.byId[id];
		this.update.emit(currency);
		super.onChange(currency);
	}

	ngOnInit() {
		super.ngOnInit();
		this.currencies$ = this.store.select(selectEntity(this.repr.entityName));
		this.currencies$.pipe(take(1)).subscribe( c => this.currencies = c);
	}

}
