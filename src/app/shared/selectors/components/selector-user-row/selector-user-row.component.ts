import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-selector-user-row',
  templateUrl: './selector-user-row.component.html',
  styleUrls: ['./selector-user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorUserRowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
