import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { MiscActions } from '../../../../store/action/misc.action';

@Component({
	selector: 'filter-selection-panel-app',
	templateUrl: './filter-selection-panel.component.html',
	styleUrls: ['./filter-selection-panel.component.scss']
})
export class FilterSelectionPanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	target$: Observable<EntityRepresentation>;
	target: EntityRepresentation;

	constructor(private store: Store<any>, private router: Router) {
		super();
	}

	ngOnInit() {
		this.target$ = this.store.select(dotSelector('misc.filterSelectionPanel.target'));
		this.target$.takeUntil(this._destroy$).subscribe(t => this.target = t);
		this.router.events.subscribe(evt => {
			if (evt instanceof NavigationEnd)
				this.closePanel();
		});
	}

	closePanel() {
		this.store.dispatch(MiscActions.setProperty('filterSelectionPanel', 'open', false));
	}

	isEntityTarget() {
		if ( this.target !== entityRepresentationMap.ratings &&
				this.target !== entityRepresentationMap.prices )
			return true;
		return false;
	}

}
