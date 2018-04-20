import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProductDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
