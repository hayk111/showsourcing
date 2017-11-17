import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-panel-app',
  templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush	
})
export class FilterPanelComponent implements OnInit {
	search = '';
  constructor() { }

  ngOnInit() {
  }

}
