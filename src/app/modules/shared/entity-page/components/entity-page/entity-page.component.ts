import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectViewSwitcher } from '../../../../store/selectors/ui/view-switcher.selector';
import { EntityRepresentation } from '../../../../store/utils/entities.utils';

@Component({
  selector: 'entity-page-app',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss']
})
export class EntityPageComponent implements OnInit {
	@Input() repr: EntityRepresentation;
	@Input() pending = true;
	@Input() switchable = true;
	@Input() filterGroupName: FilterGroupName;
	@Output() createClick = new EventEmitter<any>();

	view$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
		this.view$ = this.store.select(selectViewSwitcher);
	}



}
