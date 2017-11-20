import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter-price-panel-app',
  templateUrl: './filter-price-panel.component.html',
  styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent implements OnInit {
	min;
	max;
  constructor() { }

  ngOnInit() {
  }

}
