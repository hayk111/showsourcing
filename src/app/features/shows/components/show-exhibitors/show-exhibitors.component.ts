import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'show-exhibitors-app',
  templateUrl: './show-exhibitors.component.html',
  styleUrls: ['./show-exhibitors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowExhibitorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
