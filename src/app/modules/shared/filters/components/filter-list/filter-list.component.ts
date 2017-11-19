import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';

@Component({
  selector: 'filter-list-app',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
	@Input() targets: Array<FilterTarget>;
	@Input() filterGroupName: FilterGroupName;

  constructor() { }

  ngOnInit() {
  }

		
}
