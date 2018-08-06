import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'show-summary-app',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
