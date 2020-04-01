import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-descriptor-page',
  templateUrl: './descriptor-page.component.html',
  styleUrls: ['./descriptor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
