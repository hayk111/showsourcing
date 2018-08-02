import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppImage } from '~models';
import { Location } from '@angular/common';

@Component({
  selector: 'top-panel-details-app',
  templateUrl: './top-panel-details.component.html',
  styleUrls: ['./top-panel-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPanelDetailsComponent implements OnInit {
  @Input() logo: AppImage;
  @Input() title: string;
  @Input() links;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  toDisplayString(nav: string) {
    return nav.toLowerCase().replace(/-/g, ' ');
  }
}
