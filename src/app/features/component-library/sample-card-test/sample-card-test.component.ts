import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sample-card-test',
  templateUrl: './sample-card-test.component.html',
  styleUrls: ['./sample-card-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleCardTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
