import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'show-about-app',
  templateUrl: './show-about.component.html',
  styleUrls: ['./show-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowAboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
