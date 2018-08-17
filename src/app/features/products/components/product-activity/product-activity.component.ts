import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-activity',
  templateUrl: './product-activity.component.html',
  styleUrls: ['./product-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
