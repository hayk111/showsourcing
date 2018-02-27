import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterGroupName } from '~store/model/misc/filter.model';
import { EntityRepresentation } from '~store/utils/entities.utils';

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
	@Input() view: 'list' | 'card';
	@Output() createClick = new EventEmitter<any>();
	@Output() viewChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

	}

}
