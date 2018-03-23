import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-status-selector-badge',
  templateUrl: './status-selector-badge.component.html',
  styleUrls: ['./status-selector-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSelectorBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
