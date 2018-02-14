import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectViewSwitcher } from '../../../../store/selectors/ui/view-switcher.selector';

@Component({
  selector: 'entity-page-app',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss']
})
export class EntityPageComponent implements OnInit {
	@Input() pending = true;
	@Input() filterGroupName: FilterGroupName;
	view$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
		this.view$ = this.store.select(selectViewSwitcher);
  }

}
