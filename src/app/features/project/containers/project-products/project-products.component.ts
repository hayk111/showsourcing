import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-products',
  templateUrl: './project-products.component.html',
  styleUrls: ['./project-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
