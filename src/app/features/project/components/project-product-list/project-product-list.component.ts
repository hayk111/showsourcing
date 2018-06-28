import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-product-list',
  templateUrl: './project-product-list.component.html',
  styleUrls: ['./project-product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectProductListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
