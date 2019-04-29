import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'compare-labels-app',
  templateUrl: './compare-labels.component.html',
  styleUrls: ['./compare-labels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareLabelsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
