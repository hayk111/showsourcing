import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Booth } from '~models/booth.model';

@Component({
  selector: 'show-exhibitors-app',
  templateUrl: './show-exhibitors.component.html',
  styleUrls: ['./show-exhibitors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowExhibitorsComponent implements OnInit {
  @Input() booths: Booth[];
  constructor() { }

  ngOnInit() {
  }

}
