import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/filter.model';

@Component({
  selector: 'filtered-list-page-app',
  templateUrl: './filtered-list-page.component.html',
	styleUrls: ['./filtered-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
	
})
export class FilteredListPageComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	
  constructor() { }

  ngOnInit() {
  }

}
