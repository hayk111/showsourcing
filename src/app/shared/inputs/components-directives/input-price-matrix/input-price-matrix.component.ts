import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input-price-matrix',
  templateUrl: './input-price-matrix.component.html',
  styleUrls: ['./input-price-matrix.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPriceMatrixComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
