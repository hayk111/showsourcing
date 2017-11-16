import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
