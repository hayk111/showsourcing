import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'apollo-link';
import { Product } from '~models';

@Component({
  selector: 'find-product-dialog-app',
  templateUrl: './find-product-dialog.component.html',
  styleUrls: ['./find-product-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindProductDialogComponent implements OnInit {
  @Input() title: string = 'Find a product';
  @Input() callback: Function;
  products$: Observable<Product[]>;

  constructor() { }

  ngOnInit() {
  }

}
