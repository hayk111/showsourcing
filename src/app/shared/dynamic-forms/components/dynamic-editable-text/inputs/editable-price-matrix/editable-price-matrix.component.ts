import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-editable-price-matrix',
  templateUrl: './editable-price-matrix.component.html',
  styleUrls: ['./editable-price-matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditablePriceMatrixComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
