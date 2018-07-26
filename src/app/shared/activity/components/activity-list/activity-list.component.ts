import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { GetStreamResult } from '~shared/activity/services/activity.service';
import { Product } from '~models';
import { Router } from '@angular/router';
import { ProductService } from '~global-services/product/product.service';

@Component({
  selector: 'activity-list-app',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent implements OnInit {
  @Input() feeds: GetStreamResult[];
  constructor(
    private productSrv: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  updateProduct(product: Product) {
    this.productSrv.update(product).subscribe();
  }

  goToProduct(id: string) {
    this.router.navigate(['product', 'details', id]);
  }


}
