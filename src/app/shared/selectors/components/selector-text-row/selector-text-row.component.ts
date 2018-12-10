import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-selector-text-row',
  templateUrl: './selector-text-row.component.html',
  styleUrls: ['./selector-text-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTextRowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
