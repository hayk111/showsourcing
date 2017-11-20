import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';
import { selectFilterValuesForCategory } from '../../../../store/selectors/filter.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterActions } from '../../../../store/action/filter.action';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
  selector: 'filter-price-panel-app',
  templateUrl: './filter-price-panel.component.html',
  styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	private target = FilterTarget.price;
	vals$: Observable<Array<number>>;
	min: number;
	max: number;
  constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.vals$ = this.store
			.select(selectFilterValuesForCategory(this.filterGroupName, this.target));
		this.vals$.takeUntil(this._destroy$).subscribe(([min, max]) => {
			this.min = min;
			this.max = max;
		})
	}

	// we change value on blur to not change too often
	onBlur(){
		const action = FilterActions.setFilterPrice(this.filterGroupName, this.target, [this.min, this.max]);
		this.store.dispatch(action);
	}
}
