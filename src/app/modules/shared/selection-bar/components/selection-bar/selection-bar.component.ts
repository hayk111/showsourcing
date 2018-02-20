import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityRepresentation } from '../../../../store/utils/entities.utils';

@Component({
  selector: 'selection-bar-app',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
	@Input() repr: EntityRepresentation;
	@Input() selections;
	@Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
