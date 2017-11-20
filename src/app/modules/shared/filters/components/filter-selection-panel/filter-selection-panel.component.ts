import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
  selector: 'filter-selection-panel-app',
  templateUrl: './filter-selection-panel.component.html',
  styleUrls: ['./filter-selection-panel.component.scss']
})
export class FilterSelectionPanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	target$: Observable<FilterTarget>;
	target: FilterTarget;

  constructor(private store: Store<any>) {
		super();
	}

  ngOnInit() {
		this.target$ = this.store.select(dotSelector('misc.filterSelectionPanel.target'));
		this.target$.takeUntil(this._destroy$).subscribe(t => this.target = t);
	}
	
	get isEntityTarget() {
		if ( this.target !== FilterTarget.rating && 
				this.target !== FilterTarget.price )
			return true;
		return false;
	}

}
