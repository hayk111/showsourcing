import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'supplier-details-app',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

	// this is put in container because it will access the store
  constructor() { }

  ngOnInit() {
  }

}
