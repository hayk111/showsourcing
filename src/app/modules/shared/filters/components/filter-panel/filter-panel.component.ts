import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'filter-panel-app',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {
	search = '';
  constructor() { }

  ngOnInit() {
  }

}
