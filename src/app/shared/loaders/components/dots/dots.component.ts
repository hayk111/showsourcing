import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dots-app',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
