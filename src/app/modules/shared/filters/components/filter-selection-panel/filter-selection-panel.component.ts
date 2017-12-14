import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName} from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { MiscActions } from '../../../../store/action/misc.action';
import { FilterSelectionPanelAction } from '../../../../store/action/filter-selection-panel.action';
import { selectFilterSelectionPanelTarget } from '../../../../store/selectors/filter-selection-panel.selector';
import { EntityRepresentation } from '../../../../store/utils/entities.utils';

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
		this.target$ = this.store.select(selectFilterSelectionPanelTarget);
		this.target$.takeUntil(this._destroy$).subscribe(t => this.target = t);
		this.router.events.subscribe(evt => {
			if (evt instanceof NavigationEnd)
				this.closePanel();
		});
	}

	closePanel() {
		this.store.dispatch(FilterSelectionPanelAction.close());
	}

}
