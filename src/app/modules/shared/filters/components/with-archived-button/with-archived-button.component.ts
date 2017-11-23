import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName, entityRepresentationMap } from '../../../../store/model/filter.model';

@Component({
	selector: 'with-archived-button-app',
	templateUrl: './with-archived-button.component.html',
	styleUrls: ['./with-archived-button.component.scss']
})
export class WithArchivedButtonComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	entityRepr = entityRepresentationMap.withArchived;
	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	onChange(event) {
		if (event.checked) {
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.entityRepr, 'with archived', true));
		} else {
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.entityRepr, true));
		}
	}
}
