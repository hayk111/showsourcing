import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, FilterRepresentation} from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { MiscActions } from '../../../../store/action/misc.action';
import { FilterSelectionPanelAction } from '../../../../store/action/filter-selection-panel.action';
import { selectFilterSelectionPanelTarget } from '../../../../store/selectors/filter-selection-panel.selector';
import { EntityRepresentation, entityRepresentationMap } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'filter-selection-panel-app',
	templateUrl: './filter-selection-panel.component.html',
	styleUrls: ['./filter-selection-panel.component.scss']
})
export class FilterSelectionPanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	filterRep$: Observable<FilterRepresentation>;

	constructor(private store: Store<any>, private router: Router) {
		super();
	}

	ngOnInit() {
		this.filterRep$ = this.store.select(selectFilterSelectionPanelTarget);
		// we close the panel when changing pages
		this.router.events.subscribe(evt => {
			if (evt instanceof NavigationEnd)
				this.closePanel();
		});
	}

	closePanel() {
		this.store.dispatch(FilterSelectionPanelAction.close());
	}


}
