import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'shows-page-app',
  templateUrl: './shows-page.component.html',
  styleUrls: ['./shows-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
