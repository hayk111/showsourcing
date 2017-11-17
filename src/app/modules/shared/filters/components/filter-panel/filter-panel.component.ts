import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'filter-panel-app',
  templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush	
})
export class FilterPanelComponent implements OnInit {
	@Input() FilterGroupName: FilterGroupName;
	panelVisible$: Observable<boolean>;
	search = '';

  constructor(private store: Store<any>) { }

  ngOnInit() {
		this.panelVisible$ = this.store.select(dotSelector('misc.filterItemListPanel.open'));
  }

}
