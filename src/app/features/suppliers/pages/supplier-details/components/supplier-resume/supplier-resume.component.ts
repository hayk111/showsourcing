import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Supplier, Product } from '~core/models';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';

@Component({
	selector: 'supplier-resume-app',
	templateUrl: './supplier-resume.component.html',
	styleUrls: ['./supplier-resume.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierResumeComponent implements OnInit {

	@Input() supplier: Supplier;
	@Output() updated = new EventEmitter<Product>();

	constructor(private constPipe: ConstPipe) { }

	ngOnInit() {
	}

	update(value: any, prop: string) {
		this.updated.emit({ id: this.supplier.id, [prop]: value });
	}

	getCityCountry(city, country) {
		let cityCountryName = '';
		if (city && country)
			cityCountryName = city + ', ' + this.constPipe.transform(country, 'country');
		else if (city)
			cityCountryName = city;
		else if (country)
			cityCountryName = this.constPipe.transform(country, 'country');
		return cityCountryName;
	}

}
