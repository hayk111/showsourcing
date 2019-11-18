import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'spacing-page-app',
  templateUrl: './spacing-page.component.html',
  styleUrls: ['./spacing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpacingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
